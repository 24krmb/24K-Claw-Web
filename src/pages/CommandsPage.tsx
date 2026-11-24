import CommandCard from '../components/CommandCard'
import AbilityTabs from '../components/AbilityTabs'
import { commands } from '../data/commands'

/** 「命令」菜单页：能力页签栏（命令选中）+ 命令卡片网格 */
export default function CommandsPage() {
  return (
    <div>
      {/* 页签：命令（选中）/ 工具 / MCP / 插件 */}
      <AbilityTabs activeKey="commands" />

      {/* 命令卡片网格：桌面端一行 3 个，中屏 2 个，窄屏单列 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {commands.map((command) => (
          <CommandCard key={command.id} command={command} />
        ))}
      </div>
    </div>
  )
}
