import CommandCard from '../components/CommandCard'
import { commands } from '../data/commands'

/** 顶栏页签（命令），供 WorkspacePage 传给 TopTabs 渲染（样式与其他能力页一致） */
export const commandTabList: { key: string; label: string; icon: string }[] = [
  { key: 'commands', label: '命令', icon: 'fa-solid fa-terminal' },
]

/** 「命令」菜单页：页签渲染在顶栏（由 TopTabs 呈现）+ 命令卡片网格 */
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
