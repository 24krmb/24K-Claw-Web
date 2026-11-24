import type { Plugin } from '../types'

/** 图标块色调 → 背景色类（白图标），覆盖全部 IconTone */
const toneClasses: Record<Plugin['tone'], string> = {
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

interface PluginCardProps {
  plugin: Plugin
  /** 当前启用状态（由页面统一管理，表格/卡片视图共用） */
  enabled: boolean
  /** 启停切换回调 */
  onToggle: (id: string) => void
}

/** 插件卡片：图标块 + 名称 + tool/分类/版本/状态小标签 + 描述 + 查看详情/开关/卸载 */
export default function PluginCard({ plugin, enabled, onToggle }: PluginCardProps) {
  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm p-5">
      {/* 图标块 + 名称 + 元信息标签 */}
      <div className="flex items-start gap-3">
        <div
          className={`flex w-10 shrink-0 items-center justify-center self-stretch rounded-lg text-base text-white ${toneClasses[plugin.tone]}`}
        >
          <i className={plugin.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground">{plugin.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">tool</span>
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
      </div>

      {/* 描述 */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plugin.description}</p>

      {/* 底部：查看详情 + 卸载 + 启停开关 */}
      <div className="mt-4 flex items-center gap-2 border-t pt-3">
        <button
          type="button"
          className="cursor-pointer border-none bg-transparent text-xs text-primary outline-none hover:underline"
        >
          查看详情
        </button>
        <span className="ml-auto flex items-center gap-4">
          <button
            type="button"
            aria-label={`卸载 ${plugin.name}`}
            className="cursor-pointer border-none bg-transparent text-red-500/60 outline-none transition-colors duration-150 hover:text-red-500"
          >
            <i className="fa-regular fa-trash-can text-sm" />
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={`${plugin.name} 启停开关`}
            onClick={() => onToggle(plugin.id)}
            className={`relative inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center rounded-full px-0.5 outline-none transition-colors duration-150 ${
              enabled ? 'bg-emerald-500' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`inline-block size-3.5 rounded-full bg-white shadow transition-transform duration-150 ${
                enabled ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
          </button>
        </span>
      </div>
    </div>
  )
}
