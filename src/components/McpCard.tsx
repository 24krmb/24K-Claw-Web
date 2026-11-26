import { useState } from 'react'
import type { McpServer } from '../types'

/** 图标块色调 → 背景色类（白图标） */
const toneClasses: Record<McpServer['tone'], string> = {
  blue: 'bg-blue-600',
  indigo: 'bg-indigo-600',
  sky: 'bg-sky-600',
  cyan: 'bg-cyan-600',
  teal: 'bg-teal-600',
  emerald: 'bg-emerald-600',
  green: 'bg-green-600',
  lime: 'bg-lime-600',
  amber: 'bg-amber-600',
  orange: 'bg-orange-600',
  red: 'bg-red-600',
  rose: 'bg-rose-600',
  violet: 'bg-violet-600',
  slate: 'bg-slate-600',
  black: 'bg-black',
}

/** MCP 卡片：品牌色图标块 + 名称/单行截断描述 + 右上角添加/移除按钮（样式对照 Develop/mcp.png） */
export default function McpCard({ server }: { server: McpServer }) {
  const [installed, setInstalled] = useState(server.installed)

  return (
    <div className="flex items-start gap-4 rounded-xl border bg-card shadow-sm p-5">
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-xl text-white ${toneClasses[server.tone]}`}
      >
        <i className={server.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-medium text-foreground">{server.name}</h3>
          <button
            type="button"
            onClick={() => setInstalled((v) => !v)}
            aria-label={installed ? '移除' : '添加'}
            className={`flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors duration-150 ${
              installed
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            <i className={`text-sm ${installed ? 'fa-solid fa-check' : 'fa-solid fa-plus'}`} />
          </button>
        </div>
        <p className="truncate text-sm text-muted-foreground">{server.description}</p>
      </div>
    </div>
  )
}
