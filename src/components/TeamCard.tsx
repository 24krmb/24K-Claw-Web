import { useState } from 'react'
import type { Team } from '../types'

/** 操作行图标按钮配置（与截图一致：目录/刷新/编辑/删除/更多） */
const actions = [
  { icon: 'fa-solid fa-folder-open', label: '打开目录' },
  { icon: 'fa-solid fa-rotate', label: '刷新' },
  { icon: 'fa-solid fa-pen', label: '编辑' },
  { icon: 'fa-solid fa-trash-can', label: '删除' },
  { icon: 'fa-solid fa-ellipsis', label: '更多' },
]

/**
 * 单张「团队」卡片（布局与 AssistantCard 对齐）：
 * 头像 + 名称 + 「团队」徽章 + 运行状态点 + 启停开关 + 描述 + 成员行 + 操作行 + 「对话」按钮
 */
export default function TeamCard({ team }: { team: Team }) {
  const [running, setRunning] = useState(team.running)

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        {/* 头像 + 名称 + 团队徽章 + 状态点 + 启停开关 */}
        <div className="flex items-start gap-4">
          <img
            src={team.avatar}
            alt={`${team.name} 头像`}
            className="size-11 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-1 items-center gap-2 pt-2.5">
            <h3 className="text-sm font-semibold text-foreground">{team.name}</h3>
            <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <i className="fa-solid fa-user-group text-[10px]" />
              团队
            </span>
            <span
              aria-hidden="true"
              className={`size-1.5 shrink-0 rounded-full ${running ? 'bg-emerald-500' : 'bg-muted-foreground/60'}`}
            />
          </div>
          {/* 启停开关 */}
          <button
            type="button"
            role="switch"
            aria-checked={running}
            aria-label={`${running ? '停止' : '启动'} ${team.name}`}
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
        <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/90">{team.description}</p>

        {/* 成员行 */}
        <div className="mt-5 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">成员</span>
          <div className="flex items-center gap-2">
            {team.members.map((avatar) => (
              <img
                key={avatar}
                src={avatar}
                alt="成员头像"
                className="size-8 rounded-full border border-border bg-card object-cover"
              />
            ))}
          </div>
        </div>

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
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-primary bg-transparent px-4 py-2 text-xs font-semibold text-primary outline-none transition-colors duration-150 hover:bg-primary/10"
          >
            <i className="fa-regular fa-comment text-xs" />
            <span>对话</span>
            <i className="fa-solid fa-chevron-right text-[10px]" />
          </button>
        </div>
      </div>
    </article>
  )
}
