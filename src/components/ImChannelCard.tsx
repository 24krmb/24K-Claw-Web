import type { IconTone, ImChannel } from '../types'

/** 图标块底色（各品牌色调） */
const iconToneClasses: Record<IconTone, string> = {
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

/** 启用态卡片底色/描边随品牌色调淡显（QQ 启用为蓝色淡底） */
const enabledCardClasses: Record<IconTone, string> = {
  blue: 'border-blue-200 bg-blue-50/70 dark:border-blue-500/40 dark:bg-blue-500/10',
  indigo: 'border-indigo-200 bg-indigo-50/70 dark:border-indigo-500/40 dark:bg-indigo-500/10',
  sky: 'border-sky-200 bg-sky-50/70 dark:border-sky-500/40 dark:bg-sky-500/10',
  cyan: 'border-cyan-200 bg-cyan-50/70 dark:border-cyan-500/40 dark:bg-cyan-500/10',
  teal: 'border-teal-200 bg-teal-50/70 dark:border-teal-500/40 dark:bg-teal-500/10',
  emerald: 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/40 dark:bg-emerald-500/10',
  green: 'border-green-200 bg-green-50/70 dark:border-green-500/40 dark:bg-green-500/10',
  lime: 'border-lime-200 bg-lime-50/70 dark:border-lime-500/40 dark:bg-lime-500/10',
  amber: 'border-amber-200 bg-amber-50/70 dark:border-amber-500/40 dark:bg-amber-500/10',
  orange: 'border-orange-200 bg-orange-50/70 dark:border-orange-500/40 dark:bg-orange-500/10',
  red: 'border-red-200 bg-red-50/70 dark:border-red-500/40 dark:bg-red-500/10',
  rose: 'border-rose-200 bg-rose-50/70 dark:border-rose-500/40 dark:bg-rose-500/10',
  violet: 'border-violet-200 bg-violet-50/70 dark:border-violet-500/40 dark:bg-violet-500/10',
  slate: 'border-slate-200 bg-slate-50/70 dark:border-slate-500/40 dark:bg-slate-500/10',
  black: 'border-neutral-200 bg-neutral-100/70 dark:border-neutral-500/40 dark:bg-neutral-500/10',
}

/** 启用态开关随品牌色调（QQ 启用为蓝色开关） */
const toggleOnClasses: Record<IconTone, string> = {
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  sky: 'bg-sky-500',
  cyan: 'bg-cyan-500',
  teal: 'bg-teal-500',
  emerald: 'bg-emerald-500',
  green: 'bg-green-500',
  lime: 'bg-lime-500',
  amber: 'bg-amber-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  rose: 'bg-rose-500',
  violet: 'bg-violet-500',
  slate: 'bg-slate-500',
  black: 'bg-black',
}

interface ImChannelCardProps {
  channel: ImChannel
  /** 当前启用状态（由页面统一管理） */
  enabled: boolean
  /** 启停切换回调 */
  onToggle: (id: string) => void
}

/** IM 通道卡片：圆形品牌色图标 + 名称 + 启停开关（右上角） + 描述 + 连接状态徽章 */
export default function ImChannelCard({ channel, enabled, onToggle }: ImChannelCardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border p-5 shadow-sm transition-colors duration-150 ${
        enabled ? enabledCardClasses[channel.tone] : 'bg-card'
      }`}
    >
      {/* 圆形品牌色图标 + 名称 + 启停开关（右上角） */}
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-white ${iconToneClasses[channel.tone]}`}
        >
          <i className={channel.icon} />
        </div>
        <h3 className="min-w-0 flex-1 truncate text-[15px] font-semibold text-foreground">{channel.name}</h3>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`${channel.name} 通道启停开关`}
          onClick={() => onToggle(channel.id)}
          className={`relative inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center rounded-full px-0.5 outline-none transition-colors duration-150 after:absolute after:-inset-1.5 after:content-[''] ${
            enabled ? toggleOnClasses[channel.tone] : 'bg-muted-foreground/30'
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
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{channel.description}</p>

      {/* 连接状态徽章 + 官方插件标识 */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {enabled ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-600 dark:text-emerald-400">
            <i className="fa-solid fa-circle-check text-[11px]" />
            连接正常
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            <i className="fa-solid fa-power-off text-[11px]" />
            已禁用
          </span>
        )}
        {channel.official && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2.5 py-1 text-xs text-violet-600 dark:text-violet-400">
            <i className="fa-solid fa-circle-check text-[11px]" />
            官方插件
          </span>
        )}
      </div>
    </div>
  )
}
