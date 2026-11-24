import { useState } from 'react'
import { topTabs } from '../data/tabs'
import { useAppStore } from '../store/useAppStore'

interface TopTabsProps {
  /** 当前激活的标签 key（标签页路由传入）；菜单路由不传，头部不渲染标签 */
  activeTab?: string
  /** 菜单页头部显示的页面标题 */
  title?: string
  /** 切换标签回调（由页面组件传入，内部做路由跳转） */
  onChange?: (key: string) => void
  /** 菜单页自定义页签组（渲染进顶栏，样式与标签页一致；icon 可选） */
  menuTabs?: { key: string; label: string; icon?: string }[]
  /** 当前选中的菜单页签 key */
  activeMenuTab?: string
  /** 菜单页签切换回调 */
  onMenuTabChange?: (key: string) => void
}

/** 明暗主题切换：切 <html>.dark 并持久化到 localStorage */
function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      aria-label={isDark ? '切换到浅色模式' : '切换到暗色模式'}
      onClick={toggleTheme}
      className="ml-auto mr-4 flex cursor-pointer rounded-md border-none bg-transparent p-2 text-muted-foreground outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
    >
      <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-sm`} />
    </button>
  )
}

/** 顶部导航条：标签页路由显示标签组，菜单页显示页面标题或自定义页签组；右侧明暗切换 */
export default function TopTabs({ activeTab, title, onChange, menuTabs, activeMenuTab, onMenuTabChange }: TopTabsProps) {
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)

  return (
    <header
      className={`sticky top-0 z-10 flex items-center border-b bg-background ${
        menuTabs ? 'min-h-16' : 'h-16'
      }`}
    >
      {/* 移动端汉堡按钮 */}
      <button
        className="ml-4 rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
        aria-label="打开侧边栏"
        onClick={() => setMobileSidebarOpen(true)}
      >
        <i className="fa-solid fa-bars" />
      </button>

      {activeTab ? (
        <nav className="flex h-full items-stretch lg:pl-1" aria-label="页面标签">
          {topTabs.map((tab) => {
            const active = tab.key === activeTab
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onChange?.(tab.key)}
                aria-current={active ? 'page' : undefined}
                className={`relative flex cursor-pointer items-center gap-2 border-none px-4 text-sm font-medium transition-colors duration-150 outline-none lg:px-5 ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <i className={`${tab.icon} text-sm ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                <span>{tab.label}</span>
                {/* 可选徽标（如 BETA） */}
                {tab.badge && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold leading-4 text-primary-foreground">
                    {tab.badge}
                  </span>
                )}
                {/* 选中态底部指示条 */}
                <span
                  className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary transition-opacity duration-150 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            )
          })}
        </nav>
      ) : menuTabs && activeMenuTab !== undefined ? (
        /* 菜单页自定义页签组：渲染进顶栏，窄屏换行不滚动（min-w-0 防止撑宽页面） */
        <nav
          className="flex min-w-0 flex-wrap items-stretch lg:pl-1"
          aria-label="页面分类"
        >
          {menuTabs.map((tab) => {
            const active = tab.key === activeMenuTab
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onMenuTabChange?.(tab.key)}
                className={`relative flex shrink-0 cursor-pointer items-center gap-2 border-none px-4 text-sm font-medium transition-colors duration-150 outline-none lg:px-5 ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.icon && (
                  <i className={`${tab.icon} text-sm ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                )}
                <span>{tab.label}</span>
                <span
                  className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary transition-opacity duration-150 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            )
          })}
        </nav>
      ) : (
        title && (
          <h1 className="ml-6 text-[15px] font-medium text-foreground">{title}</h1>
        )
      )}

      {/* 明暗主题切换 */}
      <ThemeToggle />
    </header>
  )
}
