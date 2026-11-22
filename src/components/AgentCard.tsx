import type { AgentTemplate } from '../types'

/** 单张 Agent 模板卡片：头像 + 标题 + 描述 + 「从此模板新建」按钮 */
export default function AgentCard({ agent }: { agent: AgentTemplate }) {
  const handleCreate = () => {
    // 占位交互：后续接入真实新建逻辑
    console.log(`[24K-Claw] 从模板新建：${agent.name}（id=${agent.id}）`)
  }

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      {/* 头像 + 标题 */}
      <div className="flex items-center gap-3">
        <img
          src={agent.avatar}
          alt={`${agent.name} 头像`}
          className="size-11 shrink-0 rounded-full object-cover"
        />
        <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
      </div>

      {/* 描述 */}
      <p className="mt-4 flex-1 text-[13px] font-medium leading-relaxed text-muted-foreground">{agent.description}</p>

      {/* 操作按钮 */}
      <button
        type="button"
        onClick={handleCreate}
        className="mt-5 flex w-fit cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-sm font-medium text-foreground/80 transition-colors duration-150 outline-none hover:text-primary"
      >
        <i className="fa-solid fa-plus text-xs" />
        <span>从此模板新建</span>
      </button>
    </article>
  )
}
