import { useState } from 'react'
import type { Command } from '../types'
import { TONE_ICON_BG } from '../lib/tones'

export default function CommandCard({ command }: { command: Command }) {
  const [installed, setInstalled] = useState(command.installed)
  return (
    <div className="flex items-start gap-4 rounded-xl border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md p-5">
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-xl text-white ${TONE_ICON_BG[command.tone]}`}
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
                ? 'bg-primary/10 text-primary-text hover:bg-primary/20'
                : 'bg-muted text-content-tertiary hover:bg-accent'
            }`}
          >
            <i className={`text-sm ${installed ? 'fa-solid fa-check' : 'fa-solid fa-plus'}`} />
          </button>
        </div>
        <p className="mt-1.5 truncate text-sm text-content-secondary">{command.description}</p>
      </div>
    </div>
  )
}
