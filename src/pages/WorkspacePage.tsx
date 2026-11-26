import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopTabs from '../components/TopTabs'
// 带 tabList 命名导出的页面保持静态导入（页签数据渲染顶栏时需要同步可用）
import PluginsPage, { pluginTabList } from './PluginsPage'
import McpPage, { mcpTabList } from './McpPage'
import CommandsPage, { commandTabList } from './CommandsPage'
import ToolsPage, { toolTabList } from './ToolsPage'
import ModelsPage, { modelTabList } from './ModelsPage'
// 其余页面按路由懒加载，拆分首屏 bundle
const MyAssistantsPage = lazy(() => import('./MyAssistantsPage'))
const TeamPage = lazy(() => import('./TeamPage'))
const SubagentsPage = lazy(() => import('./SubagentsPage'))
const SkillsPage = lazy(() => import('./SkillsPage'))
const TasksPage = lazy(() => import('./TasksPage'))
const ImPage = lazy(() => import('./ImPage'))
const AcpPage = lazy(() => import('./AcpPage'))
const PlaceholderPage = lazy(() => import('./PlaceholderPage'))
import { topTabs, defaultTabKey } from '../data/tabs'
import { menuItems, findMenuItem, getMenuRoute } from '../data/menu'
import { useAppStore } from '../store/useAppStore'

/** 「主 Agent」菜单对应的 Agent 标签页；team 标签页对应侧边栏「团队」菜单 */
const AGENT_MENU_KEY = 'agents'
const TEAM_MENU_KEY = 'team'

/**
 * 工作区页面：左侧边栏 + 顶部标签页 + 内容区
 * 两种路由模式：
 * - 标签页路由 /agents/:tabKey（「助理中心」的标签页管理，顶部显示标签页）
 * - 菜单路由   /:menuKey 或 /:groupKey/:menuKey（其余侧边栏菜单页，按菜单层级生成路径）
 */
export default function WorkspacePage() {
  const { tabKey, menuKey, groupKey } = useParams<{
    tabKey: string
    menuKey: string
    groupKey: string
  }>()
  const navigate = useNavigate()
  const mobileSidebarOpen = useAppStore((s) => s.mobileSidebarOpen)
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)
  const setActiveMenuKey = useAppStore((s) => s.setActiveMenuKey)
  const toolsCategory = useAppStore((s) => s.toolsCategory)
  const setToolsCategory = useAppStore((s) => s.setToolsCategory)
  const pluginsCategory = useAppStore((s) => s.pluginsCategory)
  const setPluginsCategory = useAppStore((s) => s.setPluginsCategory)
  const modelsCategory = useAppStore((s) => s.modelsCategory)
  const setModelsCategory = useAppStore((s) => s.setModelsCategory)

  const isTabRoute = tabKey !== undefined
  const tabValid = isTabRoute && topTabs.some((t) => t.key === tabKey)
  // 菜单路由校验：一级项必须存在顶层菜单；二级项必须是对应分组下的子项
  const menuValid =
    !isTabRoute &&
    menuKey !== undefined &&
    (groupKey !== undefined
      ? !!findMenuItem(groupKey)?.children?.some((c) => c.key === menuKey)
      : menuItems.some((i) => i.key === menuKey))
  const activeTab = tabValid ? tabKey! : defaultTabKey
  const activeTabMeta = topTabs.find((t) => t.key === activeTab)!
  const activeMenu = menuValid ? findMenuItem(menuKey!) : undefined

  /* ===== 移动端抽屉可达性 =====
     isDesktop：≥1024px（lg 断点）时侧边栏常驻，抽屉逻辑全部跳过且不挂 inert */
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // 抽屉打开时（移动端）：锁定背景滚动、焦点移入抽屉、Escape 关闭、Tab 焦点陷阱；
  // 关闭（或切到桌面端）时：还原滚动并归还焦点到打开前的元素（汉堡按钮）
  useEffect(() => {
    if (isDesktop || !mobileSidebarOpen) return
    const container = sidebarRef.current
    if (!container) return
    const previouslyFocused = document.activeElement as HTMLElement | null

    document.body.style.overflow = 'hidden'

    // 可聚焦元素：跳过 inert / 隐藏（收起子菜单）内容
    const getFocusables = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'button:not([inert]), a[href]:not([inert]), input:not([inert]), select:not([inert]), textarea:not([inert]), [tabindex]:not([tabindex="-1"]):not([inert])',
        ),
      ).filter((el) => el.offsetParent !== null)

    getFocusables()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMobileSidebarOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      // 焦点陷阱：Tab/Shift+Tab 在抽屉内循环
      const items = getFocusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      const inside = active && container.contains(active)
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [isDesktop, mobileSidebarOpen, setMobileSidebarOpen])

  // 路由变化：由路由派生侧边栏选中态，并关闭移动端抽屉
  useEffect(() => {
    if (isTabRoute) setActiveMenuKey(tabKey === 'team' ? TEAM_MENU_KEY : AGENT_MENU_KEY)
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

  /* ===== 深链接重定向 =====
     裸的一级路由（/agents、/team）跳到其配置的 route；分组路由（/ability、/control、/management）跳到第一个子项，
     避免书签/外部链接命中时落到占位页 */
  if (!isTabRoute && activeMenu) {
    if (activeMenu.route && menuKey === activeMenu.key) {
      return <Navigate to={activeMenu.route} replace />
    }
    const firstChild = activeMenu.children?.[0]
    if (firstChild) {
      return <Navigate to={getMenuRoute(firstChild.key)} replace />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* 遮罩（仅移动端抽屉打开时） */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-200 lg:hidden ${
          mobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={() => setMobileSidebarOpen(false)}
      />

      {/* 侧边栏：桌面端固定，移动端抽屉。
          移动端抽屉关闭时挂 inert（整个侧边栏移出 Tab 顺序与可达性树）；桌面端常驻不挂 */}
      <div
        ref={(el) => {
          if (!el) return
          if (isDesktop || mobileSidebarOpen) el.removeAttribute('inert')
          else el.setAttribute('inert', '')
        }}
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* 主内容区：桌面端为侧边栏预留 220px；min-w-0 允许收缩到视口宽，
          防止顶栏页签等内容固有宽度把页面撑出横向溢出 */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-[220px]">
        {isTabRoute ? (
          <TopTabs activeTab={activeTab} onChange={handleTabChange} srOnlyTitle={activeTabMeta.label} />
        ) : menuKey === 'tools' ? (
          /* 工具页：分类页签渲染进顶栏（样式与标签页一致） */
          <TopTabs menuTabs={toolTabList} activeMenuTab={toolsCategory} onMenuTabChange={setToolsCategory} srOnlyTitle="工具" />
        ) : menuKey === 'plugins' ? (
          /* 插件页：页签渲染进顶栏（样式与标签页一致） */
          <TopTabs menuTabs={pluginTabList} activeMenuTab={pluginsCategory} onMenuTabChange={setPluginsCategory} srOnlyTitle="插件" />
        ) : menuKey === 'models' ? (
          /* 模型页：分类页签渲染进顶栏（样式与标签页一致） */
          <TopTabs menuTabs={modelTabList} activeMenuTab={modelsCategory} onMenuTabChange={setModelsCategory} srOnlyTitle="模型" />
        ) : menuKey === 'commands' ? (
          /* 命令页：页签渲染进顶栏（样式与标签页一致） */
          <TopTabs menuTabs={commandTabList} activeMenuTab="commands" srOnlyTitle="命令" />
        ) : menuKey === 'mcp' ? (
          /* MCP 页：页签渲染进顶栏（样式与标签页一致） */
          <TopTabs menuTabs={mcpTabList} activeMenuTab="mcp" srOnlyTitle="MCP" />
        ) : (
          <TopTabs title={activeMenu!.hideTitle ? undefined : (activeMenu!.pageTitle ?? activeMenu!.label)} />
        )}

        <main className="flex-1 p-4">
          {/* 懒加载页面分包加载期间的占位 */}
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                <i className="fa-solid fa-circle-notch fa-spin mr-2" aria-hidden="true" />
                加载中…
              </div>
            }
          >
            {isTabRoute ? (
            activeTab === 'mine' ? (
              <MyAssistantsPage />
            ) : activeTab === 'team' ? (
              <TeamPage />
            ) : (
              <PlaceholderPage title={activeTabMeta.label} />
            )
          ) : menuKey === 'subagents' ? (
            <SubagentsPage />
          ) : menuKey === 'skills' ? (
            <SkillsPage />
          ) : menuKey === 'plugins' ? (
            <PluginsPage />
          ) : menuKey === 'mcp' ? (
            <McpPage />
          ) : menuKey === 'commands' ? (
            <CommandsPage />
          ) : menuKey === 'tools' ? (
            <ToolsPage />
          ) : menuKey === 'models' ? (
            <ModelsPage />
          ) : menuKey === 'tasks' ? (
            <TasksPage />
          ) : menuKey === 'im' ? (
            <ImPage />
          ) : menuKey === 'acp' ? (
            <AcpPage />
          ) : (
            <PlaceholderPage title={activeMenu!.label} />
          )}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
