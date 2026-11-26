import { useState } from 'react'
import SkillCard from '../components/SkillCard'
import AssistantPicker from '../components/AssistantPicker'
import { skills } from '../data/skills'
/** 技能来源页签（对应 Skill.category） */
type SkillFilter = 'builtin' | 'pack'
/** 技能页签配置：内置 / 技能包（无计数） */
const skillTabs: { key: SkillFilter; label: string; icon: string }[] = [
  { key: 'builtin', label: '技能', icon: 'fa-solid fa-table-cells' },
  { key: 'pack', label: '技能包', icon: 'fa-solid fa-box' },
]
/** 「技能」菜单页：助理选择条 + 来源页签 + 技能卡片网格（样式对照设计稿） */
export default function SkillsPage() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('builtin')
  const visibleSkills = skills.filter((s) => s.category === activeFilter)
  return (
    <div>
      {/* 助理选择条：当前配置技能的目标助理（仅运行中） */}
      <AssistantPicker />
      {/* 来源筛选行 */}
      <div className="mt-6 flex items-center gap-8 border-b">
        {skillTabs.map((tab) => {
          const active = tab.key === activeFilter
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-2 font-medium text-sm outline-none transition-colors duration-150 ${
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
        {/* 右侧操作：导入技能 / 创建技能 */}
        <div className="ml-auto flex items-center gap-2 pb-2">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-lg border bg-transparent px-4 py-1.5 text-sm text-foreground outline-none transition-colors duration-150 hover:bg-accent"
          >
            <i className="fa-solid fa-file-import text-sm text-muted-foreground" />
            导入技能
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-lg border bg-transparent px-4 py-1.5 text-sm text-foreground outline-none transition-colors duration-150 hover:bg-accent"
          >
            <i className="fa-solid fa-plus text-sm text-muted-foreground" />
            创建技能
          </button>
        </div>
      </div>
      {/* 技能卡片网格 */}
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6">
        {visibleSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}
