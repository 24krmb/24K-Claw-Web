import { menuItems } from '../data/menu'
import { useAppStore } from '../store/useAppStore'
import MenuItemRow from './MenuItemRow'

/** 左侧边栏：Logo + 多级菜单 */
export default function Sidebar() {
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)

  return (
    <aside className="flex h-full w-[220px] flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo：亮色模式用深色标，暗色模式用白色标 */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <img
          src="/logo_horizontal_dark.png"
          alt="24K-Claw"
          className="h-9 w-auto select-none dark:hidden"
        />
        <img
          src="/logo_horizontal_white.png"
          alt="24K-Claw"
          className="hidden h-9 w-auto select-none dark:block"
        />
        {/* 移动端关闭按钮 */}
        <button
          className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent lg:hidden"
          aria-label="关闭侧边栏"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      {/* 菜单（超出高度时滚动） */}
      <nav className="flex-1 overflow-y-auto pb-6" aria-label="主导航">
        <ul className="flex flex-col gap-0.5">
          {menuItems.map((item) => (
            <MenuItemRow key={item.key} item={item} />
          ))}
        </ul>
      </nav>

      {/* 底部：头像 + 设置（游客文字移除） */}
      <div className="flex shrink-0 items-center gap-3 px-5 pb-5 pt-2">
        <img
          src="/images/avatars/0.jpg"
          alt="用户头像"
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <button
          type="button"
          aria-label="设置"
          title="设置"
          className="ml-auto flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-muted-foreground outline-none transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <i className="fa-solid fa-gear text-base" />
        </button>
      </div>
    </aside>
  )
}
