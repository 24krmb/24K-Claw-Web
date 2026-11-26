import type { Plugin } from '../types'

/** 图标块色调 → 背景色类（白图标），覆盖全部 IconTone */
const toneClasses: Record<Plugin['tone'], string> = {
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

interface PluginCardProps {
  plugin: Plugin
  /** 当前启用状态（由页面统一管理，表格/卡片视图共用） */
  enabled: boolean
  /** 启停切换回调 */
  onToggle: (id: string) => void
}

/** 插件卡片：图标块 + 名称 + 分类/版本/状态小标签 + 启停开关（右上角） + 描述 */
export default function PluginCard({ plugin, enabled, onToggle }: PluginCardProps) {
  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm p-5">
      {/* 图标块 + 名称 + 元信息标签 + 启停开关（右上角） */}
      <div className="flex items-start gap-3">
        <div
          className={`flex w-10 shrink-0 items-center justify-center self-stretch rounded-lg text-base text-white ${toneClasses[plugin.tone]}`}
        >
          <i className={plugin.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground">{plugin.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">{plugin.category}</span>
            <span className="text-[11px] text-muted-foreground">{plugin.version}</span>
            {enabled ? (
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                已加载
              </span>
            ) : (
              <span className="text-[11px] text-muted-foreground">已停用</span>
            )}
          </div>
        </div>
        {/* 启停开关：卡片右上角 */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`${plugin.name} 启停开关`}
          onClick={() => onToggle(plugin.id)}
          className={`relative inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center rounded-full px-0.5 outline-none transition-colors duration-150 after:absolute after:-inset-1.5 after:content-[''] ${
            enabled ? 'bg-emerald-500' : 'bg-muted-foreground/30'
          }`}
        >
          <span
            className={`inline-block size-3.5 rounded-full bg-white shadow transition-transform duration-150 ${
              enabled ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 描述 */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plugin.description}</p>
    </div>
  )
}
