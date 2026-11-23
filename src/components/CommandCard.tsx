import { useState } from 'react'
import type { Command } from '../types'
const toneClasses: Record<Command['tone'], string> = {
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  sky: 'bg-sky-500',
  cyan: 'bg-cyan-500',
  teal: 'bg-teal-500',
  emerald: 'bg-emerald-500',
  lime: 'bg-lime-500',
  amber: 'bg-amber-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  rose: 'bg-rose-500',
  violet: 'bg-violet-500',
  slate: 'bg-slate-500',
}

export default function CommandCard({ command }: { command: Command }) {
  const [installed, setInstalled] = useState(command.installed)
  return (
    <div className="flex items-start gap-4 rounded-xl border bg-card shadow-sm p-5">
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-xl text-white ${toneClasses[command.tone]}`}
      >
        <i className={command.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-medium text-foreground">{command.name}</h3>
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
        <p className="mt-1.5 truncate text-sm text-muted-foreground">{command.description}</p>
      </div>
    </div>
  )
}
