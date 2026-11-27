import { useState } from 'react'
import type { Tool } from '../types'
import { TONE_ICON_SOFT } from '../lib/tones'

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
    <div className="flex items-center gap-4 rounded-xl border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md p-5">
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg ${TONE_ICON_SOFT[tool.tone]}`}
      >
        <i className={tool.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground">{tool.name}</h3>
        <p className="mt-1 truncate font-mono text-sm text-content-tertiary">{tool.id}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`${tool.name} 启停开关`}
        onClick={() => setEnabled((v) => !v)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full px-1 outline-none transition-colors duration-150 ${
          enabled ? 'bg-success' : 'bg-muted-foreground/30'
        }`}
      >
        <span
          className={`inline-block size-4 rounded-full bg-white shadow transition-transform duration-150 ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
