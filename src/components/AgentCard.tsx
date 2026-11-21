import type { AgentTemplate } from '../types'

/** 单张 Agent 模板卡片：头像 + 标题 + 描述 + 「从此模板新建」按钮 */
export default function AgentCard({ agent }: { agent: AgentTemplate }) {
  const handleCreate = () => {
    // 占位交互：后续接入真实新建逻辑
    console.log(`[24KRMB] 从模板新建：${agent.name}（id=${agent.id}）`)
  }

  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* 头像 + 标题 */}
      <div className="flex items-center gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-base font-bold text-white ${agent.avatarGradient}`}
          aria-hidden="true"
        >
          {agent.avatarText}
        </span>
        <h3 className="text-base font-semibold text-gray-900">{agent.name}</h3>
      </div>

      {/* 描述 */}
      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">{agent.description}</p>

      {/* 操作按钮 */}
      <button
        type="button"
        onClick={handleCreate}
        className="mt-5 flex w-fit cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-sm font-medium text-gray-700 transition-colors duration-150 outline-none hover:text-indigo-600"
      >
        <i className="fa-solid fa-plus text-xs" />
        <span>从此模板新建</span>
      </button>
    </article>
  )
}
