import { useState } from 'react'
import type { Model, IconTone } from '../types'

/** 图标块色调 → 背景色类（白图标，无 LOGO 时使用） */
const toneClasses: Record<IconTone, string> = {
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

/** 分类 → 徽章文字 */
const categoryLabels: Record<Model['category'], string> = {
  chat: '对话模型',
  'stt-tts': '语音',
  embedding: '向量',
  system: '系统',
  search: '搜索',
}

/** 模型卡片：LOGO（白底块）/图标色块 + 名称/徽章 + 右上角启停按钮 */
export default function ModelCard({ model }: { model: Model }) {
  const [enabled, setEnabled] = useState(model.enabled)

  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm p-5">
      <div className="flex items-start gap-4">
        {model.logo ? (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl">
            <img src={model.logo} alt={`${model.name} LOGO`} className="size-7 object-contain" />
          </div>
        ) : (
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg text-white ${toneClasses[model.tone ?? 'slate']}`}
          >
            <i className={model.icon ?? 'fa-solid fa-cube'} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground">{model.name}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {categoryLabels[model.category]}
            </span>
            {enabled ? (
              <span className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">
                <i className="fa-solid fa-check text-[10px]" />
                已启用
              </span>
            ) : (
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
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
