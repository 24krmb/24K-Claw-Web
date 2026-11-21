import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopTabs from '../components/TopTabs'
import AgentGrid from '../components/AgentGrid'
import PlaceholderPage from './PlaceholderPage'
import { agentTemplates } from '../data/agents'
import { topTabs } from '../data/tabs'
import { useAppStore } from '../store/useAppStore'

/**
 * 工作区页面：左侧边栏 + 顶部标签页 + 内容区
 * 标签页 key 由路由参数 /agents/:tabKey 派生
 */
export default function WorkspacePage() {
  const { tabKey } = useParams<{ tabKey: string }>()
  const navigate = useNavigate()
  const mobileSidebarOpen = useAppStore((s) => s.mobileSidebarOpen)
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)

  const activeTab = topTabs.some((t) => t.key === tabKey) ? tabKey! : 'built-in'
  const activeTabMeta = topTabs.find((t) => t.key === activeTab)!

  // 路由变化时关闭移动端抽屉
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [tabKey, setMobileSidebarOpen])

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
        <TopTabs activeTab={activeTab} onChange={handleTabChange} />

        <main className="flex-1 p-6">
          {activeTab === 'built-in' ? (
            <AgentGrid agents={agentTemplates} />
          ) : (
            <PlaceholderPage title={activeTabMeta.label} />
          )}
        </main>
      </div>
    </div>
  )
}
