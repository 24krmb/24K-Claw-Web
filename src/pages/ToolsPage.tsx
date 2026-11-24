import ToolCard from '../components/ToolCard'
import { tools } from '../data/tools'
import { useAppStore } from '../store/useAppStore'
import type { Tool } from '../types'

/** 工具分类页签配置（对应 Tool.category，按展示顺序：知识库随交易后、助理随文件与终端前） */
export const toolCategories: Tool['category'][] = [
  '交易',
  '知识库',
  '记忆',
  '助理',
  '自动化',
  '文件与终端',
  '网页浏览',
  '媒体',
  '手机',
  '其他',
]

/** 顶栏分类页签（全部 + 10 分类），供 WorkspacePage 传给 TopTabs 渲染；图标与 tools.ts 中该分类工具保持一致 */
const categoryIcons: Record<Tool['category'], string> = {
  '交易': 'fa-solid fa-chart-line',
  '知识库': 'fa-solid fa-book-open',
  '记忆': 'fa-solid fa-brain',
  '助理': 'fa-solid fa-user-group',
  '自动化': 'fa-solid fa-clock',
  '文件与终端': 'fa-solid fa-folder-open',
  '网页浏览': 'fa-solid fa-globe',
  '媒体': 'fa-solid fa-photo-film',
  '手机': 'fa-solid fa-mobile-screen',
  '其他': 'fa-solid fa-box-archive',
}

export const toolTabList: { key: string; label: string; icon: string }[] = [
  { key: 'all', label: '全部', icon: 'fa-solid fa-screwdriver-wrench' },
  ...toolCategories.map((c) => ({ key: c, label: c, icon: categoryIcons[c] })),
]

/** 「工具」菜单页：工具卡片网格（分类页签渲染在顶栏，由 TopTabs 呈现） */
export default function ToolsPage() {
  const activeTab = useAppStore((s) => s.toolsCategory)
  const visible = activeTab === 'all' ? tools : tools.filter((t) => t.category === activeTab)

  return (
    <div>
      {/* 工具卡片网格：桌面端一行 4 个，中屏 2 个，窄屏单列 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {visible.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
