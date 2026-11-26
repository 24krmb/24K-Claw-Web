import { useState } from 'react'
import type { Tool } from '../types'

/** 图标块色调 → 浅底 + 彩色图标类，覆盖全部 IconTone（暗色模式自动适配） */
const toneClasses: Record<Tool['tone'], string> = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  lime: 'bg-lime-500/10 text-lime-600 dark:text-lime-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  slate: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  black: 'bg-black/10 text-neutral-900 dark:bg-white/10 dark:text-neutral-200',
}

/** 默认关闭的工具名称（手机类整类关闭，另含以下指定工具） */
const defaultOffTools = new Set([
  '当前日期',
  '列出助理',
  '删除定时任务',
  '更新定时任务',
  '生成视频',
  '生成图片',
  'Kimi 联网搜索',
  '编写计划',
  '重命名文件',
  '重命名目录',
  '移动目录',
  '执行指令',
])

/** 工具卡片：浅底彩色图标块 + 粗体名称 + 标识符（等宽）+ 右侧启停开关（手机类及指定工具默认关闭） */
export default function ToolCard({ tool }: { tool: Tool }) {
  const [enabled, setEnabled] = useState(
    tool.category !== '手机' && !defaultOffTools.has(tool.name),
  )

  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card shadow-sm p-5">
      <div
        className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${toneClasses[tool.tone]}`}
      >
        <i className={tool.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground">{tool.name}</h3>
        <p className="mt-1 truncate font-mono text-sm text-muted-foreground">{tool.id}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`${tool.name} 启停开关`}
        onClick={() => setEnabled((v) => !v)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full px-1 outline-none transition-colors duration-150 ${
          enabled ? 'bg-emerald-500' : 'bg-muted-foreground/30'
        }`}
      >
        <span
          className={`inline-block size-4 rounded-full bg-white shadow transition-transform duration-150 ${
            enabled ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
