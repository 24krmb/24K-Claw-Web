import { useNavigate } from 'react-router'

/** 能力页签 key：命令 / 工具 / MCP / 插件 */
export type AbilityTabKey = 'commands' | 'tools' | 'mcp' | 'plugins'

const abilityTabs: { key: AbilityTabKey; label: string; icon: string; route: string }[] = [
  { key: 'commands', label: '命令', icon: 'fa-solid fa-terminal', route: '/ability/commands' },
  { key: 'tools', label: '工具', icon: 'fa-solid fa-screwdriver-wrench', route: '/ability/tools' },
  { key: 'mcp', label: 'MCP', icon: 'fa-solid fa-server', route: '/ability/mcp' },
  { key: 'plugins', label: '插件', icon: 'fa-solid fa-plug', route: '/ability/plugins' },
]

/** 各页页签排列顺序：首位显示在左侧，其余靠右（index 1 起为右侧组） */
const tabOrders: Record<AbilityTabKey, AbilityTabKey[]> = {
  commands: ['commands', 'tools', 'mcp', 'plugins'],
  tools: ['commands', 'tools', 'mcp', 'plugins'],
  mcp: ['mcp', 'tools', 'commands', 'plugins'],
  plugins: ['commands', 'tools', 'mcp', 'plugins'],
}

/** 能力页共用页签栏：当前页名称显示在左侧选中态，其余页签靠右 */
export default function AbilityTabs({ activeKey }: { activeKey: AbilityTabKey }) {
  const navigate = useNavigate()
  const order = tabOrders[activeKey]
  return (
    <div className="flex items-center gap-8 border-b">
      {order.map((key, index) => {
        const tab = abilityTabs.find((t) => t.key === key)!
        const active = tab.key === activeKey
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              if (!active) navigate(tab.route)
            }}
            className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-3 text-sm font-medium outline-none transition-colors duration-150 ${
              index === 1 ? 'ml-auto ' : ''
            }${
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
  )
}
