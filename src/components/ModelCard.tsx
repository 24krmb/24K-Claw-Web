import { useState } from 'react'
import type { Model } from '../types'
import { STATUS, TONE_ICON_BG } from '../lib/tones'
const categoryLabels: Record<Model['category'], string> = {
  chat: '对话',
  'stt-tts': '语音',
  embedding: '向量',
  system: '系统',
  search: '搜索',
}
export default function ModelCard({ model }: { model: Model }) {
  const [enabled, setEnabled] = useState(model.enabled)

  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md p-5">
      <div className="flex items-start gap-4">
        {model.logo ? (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl">
            <img src={model.logo} alt={`${model.name} LOGO`} className="size-7 object-contain" />
          </div>
        ) : (
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg text-white ${TONE_ICON_BG[model.tone ?? 'slate']}`}
          >
            <i className={model.icon ?? 'fa-solid fa-cube'} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground">{model.name}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-content-tertiary">
              {categoryLabels[model.category]}
            </span>
            {enabled ? (
              <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-xs ${STATUS.brand}`}>
                <i className="fa-solid fa-check text-[10px]" />
                已启用
              </span>
            ) : (
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-content-tertiary">
                已停用
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEnabled((v) => !v)}
          className="shrink-0 cursor-pointer rounded-lg border bg-transparent px-4 py-1.5 text-sm text-foreground outline-none transition-colors duration-150 hover:bg-accent"
        >
          {enabled ? '禁用' : '启用'}
        </button>
      </div>
    </div>
  )
}
