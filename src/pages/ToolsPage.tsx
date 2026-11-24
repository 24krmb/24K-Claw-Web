import { useState } from 'react'
import ToolCard from '../components/ToolCard'
import { tools } from '../data/tools'
import type { Tool } from '../types'

/** 工具分类页签配置（对应 Tool.category，按展示顺序：知识库随交易后、多助理随文件与终端前） */
const toolCategories: Tool['category'][] = [
  '交易',
  '知识库',
  '记忆',
  '多助理',
  '定时任务',
  '文件与终端',
  '规划与子智能体',
  '用户交互',
  '网页与浏览器',
  '媒体生成',
  '手机',
  '其他',
]

/** 「工具」菜单页：分类页签（全部 + 12 分类）+ 工具卡片网格 */
export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<'all' | Tool['category']>('all')
  const tabs: ('all' | Tool['category'])[] = ['all', ...toolCategories]
  const visible = activeTab === 'all' ? tools : tools.filter((t) => t.category === activeTab)

  return (
    <div>
      {/* 分类页签：全部 + 12 分类（超出宽度自动换行） */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b pb-3">
        {tabs.map((tab) => {
          const active = tab === activeTab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`-mb-3.5 flex cursor-pointer items-center border-b-2 bg-transparent pb-3 text-sm font-medium outline-none transition-colors duration-150 ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'all' ? '全部' : tab}
            </button>
          )
        })}
      </div>

      {/* 工具卡片网格：桌面端一行 4 个，中屏 2 个，窄屏单列 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {visible.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
