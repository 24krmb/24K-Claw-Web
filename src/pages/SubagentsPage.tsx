import { useState } from 'react'
import SubagentCard from '../components/SubagentCard'
import { subagents } from '../data/subagents'
import { myAssistants } from '../data/assistants'

/** 分类筛选（installed / all 为虚拟页签，其余对应 Subagent.category 的金融市场子分类） */
type CategoryFilter = 'installed' | 'all' | 'research' | 'data' | 'quant' | 'news' | 'risk'

/** 分类筛选页签配置：已安装 / 全部分类 + 金融市场子分类（研究 / 数据 / 量化 / 资讯 / 风控） */
const categoryTabs: { key: CategoryFilter; label: string; icon: string; showCount?: boolean }[] = [
  { key: 'all', label: '全部分类', icon: 'fa-solid fa-table-cells' },
  { key: 'installed', label: '已安装', icon: 'fa-regular fa-circle-check' },
  { key: 'research', label: '研究', icon: 'fa-solid fa-magnifying-glass-chart', showCount: true },
  { key: 'data', label: '数据', icon: 'fa-solid fa-database', showCount: true },
  { key: 'quant', label: '量化', icon: 'fa-solid fa-square-root-variable', showCount: true },
  { key: 'news', label: '资讯', icon: 'fa-solid fa-newspaper', showCount: true },
  { key: 'risk', label: '风控', icon: 'fa-solid fa-shield-halved', showCount: true },
]

/** 「子 Agent」菜单页：助理选择条 + 分类筛选 + 子代理卡片网格（样式对照设计稿） */
export default function SubagentsPage() {
  // 选择条只显示「运行中」的助理，默认选中第一个运行中的
  const runningAssistants = myAssistants.filter((a) => a.running)
  const [selectedAssistantId, setSelectedAssistantId] = useState(runningAssistants[0]?.id ?? '')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  const visibleSubagents = subagents.filter((s) =>
    activeCategory === 'installed'
      ? s.installed
      : activeCategory === 'all'
        ? true
        : s.category === activeCategory,
  )

  return (
    <div>
      {/* 助理选择条：当前配置子 Agent 的目标助理（仅运行中） */}
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

      {/* 分类筛选行 */}
      <div className="mt-6 flex items-center gap-8 border-b">
        {categoryTabs.map((tab) => {
          const active = tab.key === activeCategory
          const count = tab.showCount
            ? subagents.filter((s) => s.category === tab.key).length
            : undefined
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-3 font-medium text-[15px] outline-none transition-colors duration-150 ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className={`${tab.icon} text-sm`} />
              <span>
                {tab.label}
                {count !== undefined && ` (${count})`}
              </span>
            </button>
          )
        })}
      </div>

      {/* 子代理卡片网格 */}
      {visibleSubagents.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 text-muted-foreground">
          <i className="fa-regular fa-folder-open text-3xl" />
          <p className="text-sm">该分类下暂无子 Agent</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {visibleSubagents.map((subagent) => (
            <SubagentCard key={subagent.id} subagent={subagent} />
          ))}
        </div>
      )}
    </div>
  )
}
