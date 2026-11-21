import { menuItems } from '../data/menu'
import { useAppStore } from '../store/useAppStore'
import MenuItemRow from './MenuItemRow'

/** 左侧边栏：Logo + 多级菜单 */
export default function Sidebar() {
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)

  return (
    <aside className="flex h-full w-60 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <span className="text-2xl font-black tracking-widest text-red-500 italic select-none">
          24KRMB
        </span>
        {/* 移动端关闭按钮 */}
        <button
          className="ml-auto rounded-md p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden"
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
    </aside>
  )
}
