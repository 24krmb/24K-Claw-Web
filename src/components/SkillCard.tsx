import { useState } from 'react'
import type { Skill } from '../types'
import { STATUS, TONE_ICON_BG } from '../lib/tones'

/** 图标块色调 → 背景色类（白图标），技能仅使用其中 6 色调 */
const toneClasses: Partial<Record<Skill['tone'], string>> = {
  violet: TONE_ICON_BG.violet,
  sky: TONE_ICON_BG.sky,
  emerald: TONE_ICON_BG.emerald,
  rose: TONE_ICON_BG.rose,
  amber: TONE_ICON_BG.amber,
  slate: TONE_ICON_BG.slate,
}

/** 来源分类 → 徽章文字 */
const categoryLabels: Record<Skill['category'], string> = {
  builtin: '内置',
  pack: '技能包',
}

/** 技能卡片：图标块 + 标题/徽章 + 右上角启用切换 + 描述（无底部操作行） */
export default function SkillCard({ skill }: { skill: Skill }) {
  const [enabled, setEnabled] = useState(skill.enabled)

  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm p-5">
      <div className="flex items-start gap-4">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg text-white ${toneClasses[skill.tone]}`}
        >
          <i className={skill.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground">{skill.name}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-content-tertiary">
              {skill.category === 'pack' && skill.skillCount
                ? `${skill.skillCount} 个技能`
                : categoryLabels[skill.category]}
            </span>
            {enabled ? (
              <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-xs ${STATUS.brand}`}>
                <i className="fa-solid fa-check text-[10px]" />
                已启用
              </span>
            ) : (
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-content-tertiary">
                已停用
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEnabled((v) => !v)}
          className="shrink-0 cursor-pointer rounded-lg border bg-transparent px-4 py-1.5 text-sm text-foreground outline-none transition-colors duration-150 hover:bg-accent"
        >
          {enabled ? '禁用' : '启用'}
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-content-secondary">{skill.description}</p>
    </div>
  )
}
