/**
 * Font Awesome 按需化：扫描项目中实际使用的图标 → 子集化字体（woff2）→ 生成精简 CSS。
 *
 * 用法：npm run fonts:subset
 * 产物：
 *   - public/webfonts/fa-{solid-900,regular-400,brands-400}.woff2（仅含用到的字形）
 *   - src/styles/fontawesome.css（@font-face + 基础类 + 用到的图标规则）
 *
 * 新增图标后重新运行本脚本即可；未包含的图标会渲染为空（无字形），脚本会打印缺失项。
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import subsetFont from 'subset-font'

const ROOT = new URL('..', import.meta.url).pathname
const FA = join(ROOT, 'node_modules/@fortawesome/fontawesome-free')

/** 递归收集待扫描文件 */
function collectFiles(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) collectFiles(p, exts, out)
    else if (exts.has(extname(name))) out.push(p)
  }
  return out
}

// 1. 扫描 src 与 index.html
const files = [
  ...collectFiles(join(ROOT, 'src'), new Set(['.ts', '.tsx', '.css'])),
  join(ROOT, 'index.html'),
]
// 1a. 「family + 图标名」成对出现 → family 明确
const pairs = new Map() // name -> Set(family)
const PAIR_RE = /fa-(solid|regular|brands)\s+(fa-[a-z0-9-]+)/g
// 1b. 所有 fa-xxx token（兜底）：三元表达式/动态拼接里的图标名没有 family 前缀（如 `isDark ? 'fa-sun' : 'fa-moon'`），
//     只要是元数据中真实存在的图标名就收录；其字形进所有字体文件以防归属判断失误
const allTokens = new Set()
const TOKEN_RE = /fa-[a-z0-9-]+/g
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  for (const [, family, name] of text.matchAll(PAIR_RE)) {
    if (!pairs.has(name)) pairs.set(name, new Set())
    pairs.get(name).add(family)
  }
  for (const token of text.matchAll(TOKEN_RE)) allTokens.add(token[0])
}
console.log(`扫描到 ${allTokens.size} 个 fa-* token`)

// 2. 元数据解析：图标名 → unicode + 实际可用 family
const meta = JSON.parse(readFileSync(join(FA, 'metadata/icon-families.json'), 'utf8'))

const missing = []
/** 字体文件 → 用到的 codepoint 集合 */
const fontGlyphs = {
  'fa-solid-900': new Set(),
  'fa-regular-400': new Set(),
  'fa-brands-400': new Set(),
}
/** 图标名 → { content, font } */
const icons = new Map()

/** 字体 key → codepoint 集合的快捷引用 */
const FONT_OF = { solid: 'fa-solid-900', regular: 'fa-regular-400', brands: 'fa-brands-400' }

/** 录入一个图标；family 集合为空时（无显式 family）字形进所有字体兜底 */
function addIcon(name, familySet) {
  const bare = name.slice(3)
  const entry = meta[bare]
  if (!entry?.unicode) return false
  icons.set(name, { content: `\\${entry.unicode}` })
  const families = familySet?.size ? [...familySet] : Object.keys(FONT_OF)
  for (const family of families) {
    fontGlyphs[FONT_OF[family]].add(parseInt(entry.unicode, 16))
  }
  return true
}

// 成对扫描到的图标：family 明确；无法解析的说明写错了名字，报错
for (const [name, families] of pairs) {
  const ok = addIcon(name, families)
  if (!ok) missing.push(name)
}
// 其余 token（三元表达式/动态拼接中的裸图标名）：仅当元数据中真实存在才收录，未收录的视为工具类静默跳过
for (const token of allTokens) {
  if (pairs.has(token)) continue
  addIcon(token, undefined)
}

if (missing.length) {
  console.error('⚠️ 以下图标在 Font Awesome Free 元数据中不存在或无对应版本，请修正：')
  console.error(missing.join(', '))
  process.exit(1)
}

// 3. 子集化字体（woff2，浏览器仅此格式；ttf 不再产出）
mkdirSync(join(ROOT, 'public/webfonts'), { recursive: true })
const FAMILY_FONT = {
  solid: ['fa-solid-900', 'Font Awesome 6 Free', 900],
  regular: ['fa-regular-400', 'Font Awesome 6 Free', 400],
  brands: ['fa-brands-400', 'Font Awesome 6 Brands', 400],
}
for (const [fontKey, codes] of Object.entries(fontGlyphs)) {
  if (!codes.size) continue
  const fontFile = join(FA, 'webfonts', `${fontKey}.ttf`)
  const text = [...codes].map((c) => String.fromCodePoint(c)).join('')
  const woff2 = await subsetFont(readFileSync(fontFile), text, { targetFormat: 'woff2' })
  writeFileSync(join(ROOT, 'public/webfonts', `${fontKey}.woff2`), woff2)
  console.log(`${fontKey}.woff2: ${(woff2.length / 1024).toFixed(1)}KB（${codes.size} 字形）`)
}

// 4. 生成精简 CSS（基础类复制自 all.min.css 核心，仅保留用到的图标规则）
mkdirSync(join(ROOT, 'src/styles'), { recursive: true })
const iconRules = [...icons.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, { content }]) => `.${name}{--fa:"${content}"}`)
  .join('\n')

const css = `/*!
 * Font Awesome Free 子集（由 scripts/generate-fa-subset.mjs 生成，勿手改）
 * 重新生成：npm run fonts:subset
 * 原始字体 License：Icons CC BY 4.0 / Fonts SIL OFL 1.1 / Code MIT（Fonticons, Inc.）
 * 当前包含 ${icons.size} 个图标字形
 */
.fa{font-family:var(--fa-style-family,"Font Awesome 6 Free");font-weight:var(--fa-style,900)}.fa,.fa-brands,.fa-regular,.fa-solid,.fab,.far,.fas{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:var(--fa-display,inline-block);font-style:normal;font-variant:normal;line-height:1;text-rendering:auto}.fa-brands:before,.fa-regular:before,.fa-solid:before,.fa:before,.fab:before,.far:before,.fas:before{content:var(--fa)}.fa-classic,.fa-regular,.fa-solid,.far,.fas{font-family:"Font Awesome 6 Free"}.fa-brands,.fab{font-family:"Font Awesome 6 Brands"}

@font-face{font-family:"Font Awesome 6 Free";font-style:normal;font-weight:900;font-display:block;src:url("/webfonts/fa-solid-900.woff2") format("woff2")}
@font-face{font-family:"Font Awesome 6 Free";font-style:normal;font-weight:400;font-display:block;src:url("/webfonts/fa-regular-400.woff2") format("woff2")}
@font-face{font-family:"Font Awesome 6 Brands";font-style:normal;font-weight:400;font-display:block;src:url("/webfonts/fa-brands-400.woff2") format("woff2")}

${iconRules}

@keyframes fa-spin{0%{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.fa-spin{animation:fa-spin var(--fa-animation-duration,1s) linear infinite}
`

writeFileSync(join(ROOT, 'src/styles/fontawesome.css'), css)
console.log(`fontawesome.css: ${(css.length / 1024).toFixed(1)}KB（${icons.size} 条图标规则）`)
