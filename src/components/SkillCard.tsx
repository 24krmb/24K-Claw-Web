import { useState } from 'react'
import type { Skill } from '../types'

/** 图标块色调 → 背景色类（白图标） */
const toneClasses: Record<Skill['tone'], string> = {
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-500',
  amber: 'bg-amber-500',
  slate: 'bg-slate-500',
}

/** 来源分类 → 徽章文字 */
const categoryLabels: Record<Skill['category'], string> = {
  installed: '已安装',
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
          <h3 className="text-sm font-semibold text-foreground">{skill.name}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {categoryLabels[skill.category]}
            </span>
            {enabled ? (
              <span className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">
                <i className="fa-solid fa-check text-[10px]" />
                已启用
              </span>
            ) : (
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
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

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
    </div>
  )
}
