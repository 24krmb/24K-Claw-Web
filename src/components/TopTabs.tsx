import { topTabs } from '../data/tabs'
import { useAppStore } from '../store/useAppStore'

interface TopTabsProps {
  /** 当前激活的标签 key（标签页路由传入）；菜单路由不传，头部不渲染标签 */
  activeTab?: string
  /** 菜单页头部显示的页面标题 */
  title?: string
  /** 切换标签回调（由页面组件传入，内部做路由跳转） */
  onChange?: (key: string) => void
}

/** 顶部导航条：标签页路由显示标签组，菜单页显示页面标题 */
export default function TopTabs({ activeTab, title, onChange }: TopTabsProps) {
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white">
      {/* 移动端汉堡按钮 */}
      <button
        className="ml-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        aria-label="打开侧边栏"
        onClick={() => setMobileSidebarOpen(true)}
      >
        <i className="fa-solid fa-bars" />
      </button>

      {activeTab ? (
        <nav className="flex h-full items-stretch" aria-label="页面标签">
          {topTabs.map((tab) => {
            const active = tab.key === activeTab
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onChange?.(tab.key)}
                aria-current={active ? 'page' : undefined}
                className={`relative flex cursor-pointer items-center gap-2 border-none px-4 text-[15px] transition-colors duration-150 outline-none lg:px-5 ${
                  active
                    ? 'font-semibold text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className={`${tab.icon} text-sm ${active ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {/* 可选徽标（如 BETA） */}
                {tab.badge && (
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[11px] font-bold leading-4 text-white">
                    {tab.badge}
                  </span>
                )}
                {/* 选中态底部指示条 */}
                <span
                  className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-indigo-600 transition-opacity duration-150 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            )
          })}
        </nav>
      ) : (
        title && (
          <h1 className="ml-1 text-[15px] font-semibold text-gray-900">{title}</h1>
        )
      )}
    </header>
  )
}
