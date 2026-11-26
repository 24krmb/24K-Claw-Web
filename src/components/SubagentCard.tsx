import type { Subagent } from '../types'

/**
 * 子 Agent 卡片（对照设计稿）：标题 + 已安装标记 + 描述（3 行截断）+ slug 与编辑/删除操作行
 */
export default function SubagentCard({ subagent }: { subagent: Subagent }) {
  // 编辑/删除为占位交互，等待后端接入后实现
  const handleEdit = () => {}

  const handleDelete = () => {}

  return (
    <article className="flex flex-col rounded-xl border bg-card p-5 shadow-sm">
      {/* 标题 + 已安装标记 */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-foreground">{subagent.name}</h3>
        {subagent.installed && (
          <i className="fa-solid fa-circle-check text-xl text-emerald-500" aria-label="已安装" />
        )}
      </div>

      {/* 描述（3 行截断） */}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/80">
        {subagent.description}
      </p>

      {/* slug + 操作行 */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <code className="truncate font-mono text-sm text-muted-foreground">{subagent.slug}</code>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleEdit}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border bg-transparent px-3 py-1.5 text-xs font-medium text-foreground outline-none transition-colors duration-150 hover:bg-accent"
          >
            <i className="fa-solid fa-pen text-xs" />
            <span>编辑</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            aria-label={`删除 ${subagent.name}`}
            className="flex cursor-pointer items-center rounded-lg border bg-transparent px-3 py-1.5 text-xs text-muted-foreground outline-none transition-colors duration-150 hover:bg-accent hover:text-destructive"
          >
            <i className="fa-solid fa-trash-can text-xs" />
          </button>
        </div>
      </div>
    </article>
  )
}
