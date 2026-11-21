import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopTabs from '../components/TopTabs'
import AgentGrid from '../components/AgentGrid'
import PlaceholderPage from './PlaceholderPage'
import { agentTemplates } from '../data/agents'
import { topTabs, defaultTabKey } from '../data/tabs'
import { findMenuItem } from '../data/menu'
import { useAppStore } from '../store/useAppStore'

/** 「主 Agent」菜单对应的 Agent 标签页 */
const AGENT_MENU_KEY = 'agents'

/**
 * 工作区页面：左侧边栏 + 顶部标签页 + 内容区
 * 两种路由模式：
 * - 标签页路由 /agents/:tabKey（「内置助理」的 Agent 管理页，顶部显示标签页）
 * - 菜单路由   /m/:menuKey（其余侧边栏菜单页，顶部显示页面标题）
 */
export default function WorkspacePage() {
  const { tabKey, menuKey } = useParams<{ tabKey: string; menuKey: string }>()
  const navigate = useNavigate()
  const mobileSidebarOpen = useAppStore((s) => s.mobileSidebarOpen)
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)
  const setActiveMenuKey = useAppStore((s) => s.setActiveMenuKey)

  const isTabRoute = tabKey !== undefined
  const tabValid = isTabRoute && topTabs.some((t) => t.key === tabKey)
  const menuValid = !isTabRoute && menuKey !== undefined && !!findMenuItem(menuKey)
  const activeTab = tabValid ? tabKey! : defaultTabKey
  const activeTabMeta = topTabs.find((t) => t.key === activeTab)!
  const activeMenu = menuValid ? findMenuItem(menuKey!) : undefined

  // 路由变化：由路由派生侧边栏选中态，并关闭移动端抽屉
  useEffect(() => {
    if (isTabRoute) setActiveMenuKey(AGENT_MENU_KEY)
    else if (menuValid) setActiveMenuKey(menuKey!)
    setMobileSidebarOpen(false)
  }, [isTabRoute, tabKey, menuKey, menuValid, setActiveMenuKey, setMobileSidebarOpen])

  // 非法 key：重定向回默认标签页
  if ((isTabRoute && !tabValid) || (!isTabRoute && !menuValid)) {
    return <Navigate to={`/agents/${defaultTabKey}`} replace />
  }

  const handleTabChange = (key: string) => {
    navigate(`/agents/${key}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 遮罩（仅移动端抽屉打开时） */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-200 lg:hidden ${
          mobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={() => setMobileSidebarOpen(false)}
      />

      {/* 侧边栏：桌面端固定，移动端抽屉 */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* 主内容区：桌面端为侧边栏预留 240px */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-60">
        {isTabRoute ? (
          <TopTabs activeTab={activeTab} onChange={handleTabChange} />
        ) : (
          <TopTabs title={activeMenu!.label} />
        )}

        <main className="flex-1 p-6">
          {isTabRoute ? (
            activeTab === 'built-in' ? (
              <AgentGrid agents={agentTemplates} />
            ) : (
              <PlaceholderPage title={activeTabMeta.label} />
            )
          ) : (
            <PlaceholderPage title={activeMenu!.label} />
          )}
        </main>
      </div>
    </div>
  )
}
