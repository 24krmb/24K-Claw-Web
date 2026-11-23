import CommandCard from '../components/CommandCard'
import { commands } from '../data/commands'
export default function CommandsPage() {
  return (
    <div>
      {/* 命令卡片网格：桌面端一行 3 个，中屏 2 个，窄屏单列 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {commands.map((command) => (
          <CommandCard key={command.id} command={command} />
        ))}
      </div>
    </div>
  )
}
