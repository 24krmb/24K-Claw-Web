import { useState } from 'react'
import PluginCard from '../components/PluginCard'
import { plugins } from '../data/plugins'


const devGuideSteps: { title: string; desc: string }[] = [
{ title: '开发', desc: '创建一个包含 plugin.yaml 与入口 Python 文件（如 main.py）的目录。plugin.yaml 需包含 id、version、name、kind（tool / skill / hook）和 entry。setup(ctx) 中：tool → ctx.tool(...)；skill → ctx.skills("skills")；hook → ctx.middleware(...)。仓库 plugins/ 下有三类 demo 可参考。' },
{ title: '打包', desc: '将插件打成 ZIP，且压缩包内只能有一个带 plugin.yaml 的插件根目录（可在 ZIP 根目录，或唯一的一层子目录中）。示例：zip -r my-plugin.zip my-plugin/' },
{ title: '导入', desc: '把 .zip 放到 24K-Claw 可通过 HTTP(S) 下载的位置，优先使用 raw 直链。安装后前往「插件」为Agent配置。本地 demo：24kclaw plugin install ./plugins/demo-toolkit --force' },
]

const pluginYamlExample = `id: my-plugin
version: 1.0.0
name: My Plugin
description: Example tool plugin
icon: icon.svg
group: tools
kind: tool
entry: main.py`

/** 「插件」菜单页：页签（已安装插件/插件开发）+ 统计/操作行 + 卡片/表格双视图 */
export default function PluginsPage() {
  const [activeTab, setActiveTab] = useState<'installed' | 'develop'>('installed')
  const [view, setView] = useState<'card' | 'table'>('card')
  const [guideOpen, setGuideOpen] = useState(true)
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(
    Object.fromEntries(plugins.map((p) => [p.id, p.enabled])),
  )
  const toggleEnabled = (id: string) =>
    setEnabledMap((m) => ({ ...m, [id]: !m[id] }))

  return (
    <div>
      {/* 页签：已安装插件 / 插件开发 */}
      <div className="flex items-center gap-8 border-b">
        {(
          [
            { key: 'installed', label: '已安装插件', icon: 'fa-solid fa-plug' },
            { key: 'develop', label: '插件开发', icon: 'fa-solid fa-store' },
          ] as const
        ).map((tab) => {
          const active = tab.key === activeTab
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-3 text-sm font-medium outline-none transition-colors duration-150 ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className={`${tab.icon} text-sm`} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'develop' ? (
        /* 插件开发：开发指南折叠框 */
        <div className="mt-6 rounded-xl border bg-card">
          <button
            type="button"
            onClick={() => setGuideOpen((v) => !v)}
            aria-expanded={guideOpen}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl border-none bg-transparent px-4 py-3 text-sm text-foreground outline-none"
          >
            <i
              className={`fa-solid fa-chevron-right text-xs text-muted-foreground transition-transform duration-150 ${
                guideOpen ? 'rotate-90' : ''
              }`}
            />
            <i className="fa-solid fa-puzzle-piece text-primary" />
            如何开发并导入插件
          </button>
          {guideOpen && (
            <div className="border-t px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <ul className="flex flex-col gap-2.5">
                {devGuideSteps.map((step) => (
                  <li key={step.title}>
                    <span className="font-medium text-foreground">{step.title}</span>：{step.desc}
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <span className="font-medium text-foreground">最小 plugin.yaml 示例</span>
                <pre className="mt-1.5 overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs leading-relaxed text-foreground">
                  {pluginYamlExample}
                </pre>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* 操作行：视图切换（左） + 安装按钮（右） */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pb-3">
            {/* 视图切换：卡片 / 表格 */}
            <div className="flex items-center rounded-lg border p-0.5">
              <button
                type="button"
                aria-label="卡片视图"
                onClick={() => setView('card')}
                className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs outline-none transition-colors duration-150 ${
                  view === 'card'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <i className="fa-regular fa-window-maximize" />
                卡片
              </button>
              <button
                type="button"
                aria-label="表格视图"
                onClick={() => setView('table')}
                className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs outline-none transition-colors duration-150 ${
                  view === 'table'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <i className="fa-solid fa-table-list" />
                表格
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* 从 ZIP 安装 */}
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border bg-transparent px-3 py-1.5 text-sm text-foreground outline-none transition-colors duration-150 hover:bg-accent"
              >
                <i className="fa-solid fa-upload text-xs" />
                从 ZIP 安装
              </button>
              {/* 安装 */}
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground outline-none transition-colors duration-150 hover:opacity-90"
              >
                <i className="fa-solid fa-plus text-xs" />
                安装
              </button>
            </div>
          </div>

          {/* 卡片 / 表格视图 */}
          {view === 'card' ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
              {plugins.map((plugin) => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  enabled={enabledMap[plugin.id]}
                  onToggle={toggleEnabled}
                />
              ))}
            </div>
          ) : (
            <PluginTable enabledMap={enabledMap} onToggle={toggleEnabled} />
          )}
        </>
      )}
    </div>
  )
}

/** 表格视图 */
function PluginTable({ enabledMap, onToggle }: { enabledMap: Record<string, boolean>; onToggle: (id: string) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[840px] border-collapse text-sm">
        <thead>
          <tr className="border-b text-xs text-muted-foreground">
            <th className="px-4 py-3 text-left font-medium">插件</th>
            <th className="px-4 py-3 text-left font-medium">分类</th>
            <th className="px-4 py-3 text-left font-medium">版本</th>
            <th className="px-4 py-3 text-left font-medium">状态</th>
            <th className="px-4 py-3 text-left font-medium">描述</th>
            <th className="px-4 py-3 text-left font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {plugins.map((plugin) => {
            const enabled = enabledMap[plugin.id]
            return (
              <tr key={plugin.id} className="border-b transition-colors duration-150 last:border-b-0 hover:bg-accent/50">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <i className={`${plugin.icon} w-4 text-center text-primary`} />
                    {plugin.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{plugin.category}</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{plugin.version}</td>
                <td className="px-4 py-3">
                  {enabled ? (
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-600 dark:text-emerald-400">已加载</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">已停用</span>
                  )}
                </td>
                <td className="max-w-[280px] px-4 py-3">
                  <span className="block truncate text-xs text-muted-foreground" title={plugin.description}>
                    {plugin.description}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      className="cursor-pointer border-none bg-transparent text-primary outline-none hover:underline"
                    >
                      查看详情
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggle(plugin.id)}
                      className="cursor-pointer border-none bg-transparent text-primary outline-none hover:underline"
                    >
                      {enabled ? '停用' : '启用'}
                    </button>
                    <button
                      type="button"
                      aria-label={`卸载 ${plugin.name}`}
                      className="cursor-pointer border-none bg-transparent text-red-500/60 outline-none transition-colors duration-150 hover:text-red-500"
                    >
                      <i className="fa-regular fa-trash-can" />
                    </button>
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
