import { useState } from 'react'
import { useNavigate } from 'react-router'
import CommandCard from '../components/CommandCard'
import { commands } from '../data/commands'

/** 「命令」菜单页：页签（命令/工具）+ 命令卡片网格 */
export default function CommandsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'commands' | 'tools'>('commands')

  return (
    <div>
      {/* 页签：命令 / 工具（工具页签跳转到独立工具页 /ability/tools） */}
      <div className="flex items-center gap-8 border-b">
        {(
          [
            { key: 'commands', label: '命令', icon: 'fa-solid fa-terminal', route: null },
            { key: 'tools', label: '工具', icon: 'fa-solid fa-screwdriver-wrench', route: '/ability/tools' },
          ] as const
        ).map((tab) => {
          const active = tab.key === activeTab
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                if (tab.route) {
                  navigate(tab.route)
                  return
                }
                setActiveTab(tab.key)
              }}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-3 text-sm font-medium outline-none transition-colors duration-150 ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className={`${tab.icon} text-sm`} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* 命令卡片网格：桌面端一行 3 个，中屏 2 个，窄屏单列 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {commands.map((command) => (
          <CommandCard key={command.id} command={command} />
        ))}
      </div>
    </div>
  )
}
