import { useState } from 'react'
import SubagentCard from '../components/SubagentCard'
import AssistantPicker from '../components/AssistantPicker'
import { subagents } from '../data/subagents'

/** 分类筛选（installed / all 为虚拟页签，其余对应 Subagent.category 的金融市场子分类） */
type CategoryFilter = 'installed' | 'all' | 'data' | 'quant' | 'news' | 'risk'

/** 分类筛选页签配置：已安装 / 全部分类 + 金融市场子分类（数据 / 量化 / 资讯 / 风控） */
const categoryTabs: { key: CategoryFilter; label: string; icon: string; showCount?: boolean }[] = [
  { key: 'all', label: '全部分类', icon: 'fa-solid fa-table-cells' },
  { key: 'installed', label: '已安装', icon: 'fa-regular fa-circle-check' },
  { key: 'data', label: '数据', icon: 'fa-solid fa-database', showCount: true },
  { key: 'quant', label: '量化', icon: 'fa-solid fa-square-root-variable', showCount: true },
  { key: 'news', label: '资讯', icon: 'fa-solid fa-newspaper', showCount: true },
  { key: 'risk', label: '风控', icon: 'fa-solid fa-shield-halved', showCount: true },
]

/** 「子 Agent」菜单页：助理选择条 + 分类筛选 + 子代理卡片网格（样式对照设计稿） */
export default function SubagentsPage() {
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
      <AssistantPicker />

      {/* 分类筛选行 */}
      <div className="mt-6 flex items-center gap-8 overflow-x-auto whitespace-nowrap border-b">
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
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-2 font-medium text-sm outline-none transition-colors duration-150 ${
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
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6">
          {visibleSubagents.map((subagent) => (
            <SubagentCard key={subagent.id} subagent={subagent} />
          ))}
        </div>
      )}
    </div>
  )
}
