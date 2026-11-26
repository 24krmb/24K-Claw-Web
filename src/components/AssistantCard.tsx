import { useState } from 'react'
import type { Assistant } from '../types'

/** 操作行图标按钮配置 */
const actions = [
  { icon: 'fa-solid fa-folder-open', label: '打开目录' },
  { icon: 'fa-solid fa-pen', label: '编辑' },
  { icon: 'fa-solid fa-trash-can', label: '删除' },
  { icon: 'fa-solid fa-arrow-up-from-bracket', label: '分享' },
  { icon: 'fa-solid fa-ellipsis', label: '更多' },
]

/**
 * 单张「我的助理」卡片：
 * 头像/名称/运行状态 + 启停开关 + 描述 + 操作行 + 「对话」按钮
 */
export default function AssistantCard({ assistant }: { assistant: Assistant }) {
  const [running, setRunning] = useState(assistant.running)

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        {/* 头像 + 信息 + 启停开关 */}
        <div className="flex items-start gap-4">
          <img
            src={assistant.avatar}
            alt={`${assistant.name} 头像`}
            className="size-11 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-foreground">{assistant.name}</h3>
            <span
              className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                running ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-muted text-muted-foreground'
              }`}
            >
              <span className={`size-1.5 rounded-full ${running ? 'bg-emerald-500' : 'bg-muted-foreground/60'}`} />
              {running ? '运行中' : '已停止'}
            </span>
          </div>
          {/* 启停开关 */}
          <button
            type="button"
            role="switch"
            aria-checked={running}
            aria-label={`${running ? '停止' : '启动'} ${assistant.name}`}
            onClick={() => setRunning(!running)}
            className={`mt-1 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-none p-0.5 outline-none transition-colors duration-200 ${
              running ? 'bg-emerald-500' : 'bg-muted-foreground/40'
            }`}
          >
            <span
              className={`inline-block size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                running ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 描述 */}
        <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{assistant.description}</p>

        {/* 操作行 */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div className="flex items-center gap-2.5">
            {actions.map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                title={b.label}
                className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-transparent text-muted-foreground outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
              >
                <i className={`${b.icon} text-xs`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border bg-transparent px-4 py-2 text-xs font-medium outline-none transition-colors duration-150 hover:bg-primary/10"
          >
            <i className="fa-regular fa-comment text-xs" />
            <span>对话</span>
          </button>
        </div>
      </div>
    </article>
  )
}
