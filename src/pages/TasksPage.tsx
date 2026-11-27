import { useState } from 'react'
import { tasks } from '../data/tasks'
import { STATUS } from '../lib/tones'
import type { Task } from '../types'

/** 上次状态徽章样式 */
const statusBadge: Record<Task['lastStatus'], { text: string; className: string }> = {
  success: { text: '成功', className: STATUS.success },
  failure: { text: '失败', className: 'bg-red-500/10 text-red-600 dark:text-red-400' },
}

/** 「自动化」菜单页：统计行 + 定时任务表格/卡片 */
export default function TasksPage() {
  const [view, setView] = useState<'table' | 'card'>('card')
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(
    Object.fromEntries(tasks.map((t) => [t.id, t.enabled])),
  )
  const toggleEnabled = (id: string) =>
    setEnabledMap((m) => ({ ...m, [id]: !m[id] }))

  return (
    <div>
      {/* 视图切换（左） + 创建按钮（右） */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center rounded-lg border p-0.5">
          <button
            type="button"
            aria-label="卡片视图"
            onClick={() => setView('card')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs outline-none transition-colors duration-150 ${
              view === 'card'
                ? 'bg-primary/10 text-primary'
                : 'bg-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <i className="fa-regular fa-window-maximize" />
            卡片
          </button>
          <button
            type="button"
            aria-label="列表视图"
            onClick={() => setView('table')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs outline-none transition-colors duration-150 ${
              view === 'table'
                ? 'bg-primary/10 text-primary'
                : 'bg-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <i className="fa-solid fa-table" />
            列表
          </button>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground outline-none transition-colors duration-150 hover:opacity-90"
        >
          <i className="fa-solid fa-plus text-xs" />
          创建自动化任务
        </button>
      </div>

      {view === 'table' ? <TaskTable enabledMap={enabledMap} onToggle={toggleEnabled} /> : <TaskCards enabledMap={enabledMap} onToggle={toggleEnabled} />}
    </div>
  )
}

/** 表格视图 */
function TaskTable({ enabledMap, onToggle }: { enabledMap: Record<string, boolean>; onToggle: (id: string) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[960px] border-collapse text-sm">
        <thead>
          <tr className="border-b text-xs text-muted-foreground">
            <th className="px-4 py-3 text-left font-medium">任务ID</th>
            <th className="px-4 py-3 text-left font-medium">名称</th>
            <th className="px-4 py-3 text-left font-medium">已启用</th>
            <th className="px-4 py-3 text-left font-medium">调度</th>
            <th className="px-4 py-3 text-left font-medium">类型</th>
            <th className="px-4 py-3 text-left font-medium">指令</th>
            <th className="px-4 py-3 text-left font-medium">上次执行</th>
            <th className="px-4 py-3 text-left font-medium">上次状态</th>
            <th className="px-4 py-3 text-left font-medium">新会话</th>
            <th className="px-4 py-3 text-left font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const enabled = enabledMap[task.id]
            const status = statusBadge[task.lastStatus]
            return (
              <tr key={task.id} className="border-b transition-colors duration-150 last:border-b-0 hover:bg-accent/50">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-mono text-xs text-foreground">
                    <i className="fa-regular fa-clock text-primary" />
                    {task.id}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{task.name}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full ${enabled ? 'bg-success' : 'bg-muted-foreground/60'}`}
                    />
                    {enabled ? '已启用' : '已停用'}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{task.schedule}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">{task.type}</span>
                    <span className="text-xs text-muted-foreground">（{task.typeNote}）</span>
                  </span>
                </td>
                <td className="max-w-[220px] px-4 py-3">
                  <span className="block truncate text-xs text-muted-foreground" title={task.prompt}>
                    {task.prompt}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{task.lastRun}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-md px-2 py-0.5 text-xs ${status.className}`}>{status.text}</span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{task.newSession ? '是' : '否'}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => onToggle(task.id)}
                      className="cursor-pointer border-none bg-transparent text-primary outline-none hover:underline"
                    >
                      {enabled ? '禁用' : '启用'}
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer border-none bg-transparent text-primary outline-none hover:underline"
                    >
                      立即执行
                    </button>
                    <button
                      type="button"
                      aria-label="更多操作"
                      className="cursor-pointer border-none bg-transparent text-muted-foreground outline-none hover:text-foreground"
                    >
                      <i className="fa-solid fa-ellipsis" />
                    </button>
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** 卡片视图 */
function TaskCards({ enabledMap, onToggle }: { enabledMap: Record<string, boolean>; onToggle: (id: string) => void }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6">
      {tasks.map((task) => {
        const enabled = enabledMap[task.id]
        const status = statusBadge[task.lastStatus]
        return (
          <div key={task.id} className="flex flex-col rounded-xl border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md p-5">
            <div className="flex items-start gap-3">
              <i className="fa-regular fa-clock mt-0.5 text-primary" />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-foreground">{task.name}</h3>
              </div>
              <span className={`rounded-md px-2 py-0.5 text-xs ${status.className}`}>{status.text}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono text-foreground">{task.schedule}</span>
              <span>·</span>
              <span>{enabled ? '已启用' : '已停用'}</span>
              <span>·</span>
              <span>新会话：{task.newSession ? '是' : '否'}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground" title={task.prompt}>
              {task.prompt}
            </p>
            <div className="mt-4 flex items-center gap-2 border-t pt-3 text-xs">
              <span className="flex-1 text-muted-foreground">任务ID <span className="font-mono">{task.id}</span></span>
              <button
                type="button"
                onClick={() => onToggle(task.id)}
                className="cursor-pointer border-none bg-transparent text-primary outline-none hover:underline"
              >
                {enabled ? '禁用' : '启用'}
              </button>
              <button
                type="button"
                className="cursor-pointer border-none bg-transparent text-primary outline-none hover:underline"
              >
                立即执行
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
