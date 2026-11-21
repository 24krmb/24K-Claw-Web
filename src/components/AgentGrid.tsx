import type { AgentTemplate } from '../types'
import AgentCard from './AgentCard'

/** Agent 模板卡片网格：窗口缩放时按 320px 最小列宽自动换列 */
export default function AgentGrid({ agents }: { agents: AgentTemplate[] }) {
  if (agents.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 text-gray-400">
        <i className="fa-regular fa-folder-open text-3xl" />
        <p className="text-sm">暂无内容</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  )
}
