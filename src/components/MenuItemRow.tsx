import { useNavigate } from 'react-router-dom'
import type { MenuItem } from '../types'
import { getMenuRoute } from '../data/menu'
import { useAppStore } from '../store/useAppStore'

interface MenuItemRowProps {
  item: MenuItem
  /** 是否为子菜单（控制缩进与字号） */
  isChild?: boolean
}

/**
 * 单个菜单行：支持展开/收起子菜单，子菜单渲染采用 grid-rows 平滑过渡
 */
export default function MenuItemRow({ item, isChild = false }: MenuItemRowProps) {
  const navigate = useNavigate()
  const activeMenuKey = useAppStore((s) => s.activeMenuKey)
  const expandedGroups = useAppStore((s) => s.expandedGroups)
  const toggleGroup = useAppStore((s) => s.toggleGroup)
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen)

  const hasChildren = !!item.children?.length
  const expanded = expandedGroups.includes(item.key)
  const selected = activeMenuKey === item.key
  /** 子菜单容器 id（供分组按钮 aria-controls 引用） */
  const submenuId = hasChildren ? `submenu-${item.key}` : undefined

  const handleClick = () => {
    if (hasChildren) {
      // 有子菜单：点击仅展开/收起
      toggleGroup(item.key)
      return
    }
    // 叶子菜单：跳转对应页面并关闭移动端抽屉（选中态由路由派生，见 WorkspacePage）
    navigate(getMenuRoute(item.key))
    setMobileSidebarOpen(false)
  }

  const rowClass = [
    'group flex w-full cursor-pointer items-center gap-3 border-none text-left',
    'transition-colors duration-150 outline-none',
    isChild ? 'py-2 pl-7 pr-5 text-sm' : hasChildren ? 'py-2.5 pl-5 pr-4 text-xs' : 'py-2.5 pl-5 pr-4 text-[15px]',
    selected
      ? 'font-medium text-sidebar-primary'
      : hasChildren
        ? 'bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        : 'bg-transparent text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
  ].join(' ')

  return (
    <li>
      {/* 菜单行（用 button 保证键盘可达；分组按钮暴露 aria-expanded / aria-controls） */}
      <button
        type="button"
        className={rowClass}
        onClick={handleClick}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-controls={submenuId}
      >
        {/* 分组标题不显示图标，纯文字 + 右侧箭头；叶子项保留图标 */}
        {!hasChildren && (
          <i
            className={`${item.icon} w-5 text-center text-[15px] ${
              selected ? 'text-sidebar-primary' : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
            }`}
          />
        )}
        <span className={`flex-1 ${hasChildren ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
        {hasChildren && (
          <i
            className={`fa-solid fa-chevron-right text-[10px] text-muted-foreground transition-transform duration-200 ${
              expanded ? 'rotate-90' : ''
            }`}
          />
        )}
      </button>

      {/* 子菜单：grid-rows 平滑展开/收起；收起时挂 inert（键盘 Tab 不可进入隐藏区域，
          屏幕阅读器也从可达性树中移除），展开时移除 */}
      {hasChildren && (
        <div
          id={submenuId}
          className={`grid transition-[grid-template-rows] duration-200 ease-out ${
            expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div
            className="overflow-hidden"
            ref={(el) => {
              if (!el) return
              if (expanded) el.removeAttribute('inert')
              else el.setAttribute('inert', '')
            }}
          >
            <ul className="flex flex-col gap-0.5 py-0.5">
              {item.children!.map((child) => (
                <MenuItemRow key={child.key} item={child} isChild />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}
