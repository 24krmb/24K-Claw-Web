import { useState } from 'react'
import SkillCard from '../components/SkillCard'
import { skills } from '../data/skills'
import { myAssistants } from '../data/assistants'

/** 技能来源页签（对应 Skill.category） */
type SkillFilter = 'installed' | 'builtin' | 'market' | 'pack'

/** 技能页签配置：已安装 / 内置 / 市场 / 技能包（对照设计稿，无计数） */
const skillTabs: { key: SkillFilter; label: string; icon: string }[] = [
  { key: 'installed', label: '已安装技能', icon: 'fa-solid fa-puzzle-piece' },
  { key: 'builtin', label: '内置技能', icon: 'fa-solid fa-table-cells' },
  { key: 'market', label: '技能市场', icon: 'fa-solid fa-bag-shopping' },
  { key: 'pack', label: '技能包', icon: 'fa-solid fa-box' },
]

/** 「技能」菜单页：助理选择条 + 来源页签 + 技能卡片网格（样式对照设计稿） */
export default function SkillsPage() {
  // 选择条只显示「运行中」的助理，默认选中第一个运行中的
  const runningAssistants = myAssistants.filter((a) => a.running)
  const [selectedAssistantId, setSelectedAssistantId] = useState(runningAssistants[0]?.id ?? '')
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('builtin')

  const visibleSkills = skills.filter((s) => s.category === activeFilter)

  return (
    <div>
      {/* 助理选择条：当前配置技能的目标助理（仅运行中） */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card px-5 py-4">
        <span className="mr-2 text-sm text-muted-foreground">助理</span>
        {runningAssistants.map((assistant) => {
          const selected = assistant.id === selectedAssistantId
          return (
            <button
              key={assistant.id}
              type="button"
              onClick={() => setSelectedAssistantId(assistant.id)}
              className={`flex cursor-pointer items-center gap-2 rounded-full border bg-transparent px-3 py-1.5 text-sm outline-none transition-colors duration-150 ${
                selected
                  ? 'border-amber-300 bg-amber-50 text-foreground dark:border-amber-500/40 dark:bg-amber-500/10'
                  : 'border-border text-foreground hover:bg-accent'
              }`}
            >
              <img
                src={assistant.avatar}
                alt=""
                className="size-6 rounded-full border border-border object-cover"
              />
              <span>{assistant.name}</span>
              <span
                className={`size-1.5 rounded-full ${assistant.running ? 'bg-emerald-500' : 'bg-muted-foreground/40'}`}
              />
            </button>
          )
        })}
      </div>

      {/* 来源筛选行 */}
      <div className="mt-6 flex items-center gap-8 border-b">
        {skillTabs.map((tab) => {
          const active = tab.key === activeFilter
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-3 font-medium text-[15px] outline-none transition-colors duration-150 ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className={`${tab.icon} text-sm`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* 技能卡片网格 */}
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-6">
        {visibleSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}
