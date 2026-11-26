import { useEffect, useRef, useState } from 'react'

/** 社区主站地址（实战交流，新窗口打开） */
const officialUrl = 'https://www.24krmb.com'

/**
 * 侧边栏 LOGO 右侧的版本切换：
 * 当前站点为演示版；下拉中的「实战交流」以新窗口打开社区主站
 */
export default function VersionSwitcher() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // 点击组件外部或按 Esc 关闭下拉
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative ml-auto shrink-0">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="切换版本，当前为演示版"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-7 cursor-pointer items-center gap-1 rounded-full border border-sidebar-foreground/20 bg-transparent pl-2 pr-2 text-[11px] font-medium text-sidebar-foreground/70 outline-none transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        演示版
        <i
          className={`fa-solid fa-chevron-down text-[8px] transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="选择站点版本"
          className="absolute right-0 top-full z-30 mt-1.5 w-28 rounded-lg border border-border bg-popover p-1 shadow-md"
        >
          {/* 当前站点：演示版 */}
          <button
            type="button"
            role="menuitemradio"
            aria-checked="true"
            onClick={() => setOpen(false)}
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium text-primary outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
          >
            演示版
            <i className="fa-solid fa-check text-[10px]" />
          </button>

          {/* 实战交流：新窗口打开社区主站 */}
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs text-popover-foreground outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
          >
            实战交流
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
          </a>
        </div>
      )}
    </div>
  )
}
