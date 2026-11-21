import { topTabs } from '../data/tabs'
import { useAppStore } from '../store/useAppStore'

interface TopTabsProps {
  /** 当前激活的标签 key（由路由参数派生） */
  activeTab: string
  /** 切换标签回调（由页面组件传入，内部做路由跳转） */
  onChange: (key: string) => void
}

/** 顶部标签页导航：图标 + 文字，选中态靛蓝色下划线 */
export default function TopTabs({ activeTab, onChange }: TopTabsProps) {
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

      <nav className="flex h-full items-stretch" aria-label="页面标签">
        {topTabs.map((tab) => {
          const active = tab.key === activeTab
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              aria-current={active ? 'page' : undefined}
              className={`relative flex cursor-pointer items-center gap-2 border-none px-4 text-[15px] transition-colors duration-150 outline-none lg:px-5 ${
                active
                  ? 'font-semibold text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className={`${tab.icon} text-sm ${active ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
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
    </header>
  )
}
