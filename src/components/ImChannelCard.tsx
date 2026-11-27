import type { ImChannel } from '../types'
import { STATUS, TONE_CARD_TINT, TONE_ICON_BG, TONE_SWITCH } from '../lib/tones'

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
        enabled ? TONE_CARD_TINT[channel.tone] : 'bg-card'
      }`}
    >
      {/* 圆形品牌色图标 + 名称 + 启停开关（右上角） */}
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-white ${TONE_ICON_BG[channel.tone]}`}
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
            enabled ? TONE_SWITCH[channel.tone] : 'bg-muted-foreground/30'
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
      <p className="mt-3 text-xs leading-relaxed text-content-secondary">{channel.description}</p>

      {/* 连接状态徽章 + 官方插件标识 */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {enabled ? (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${STATUS.success}`}>
            <i className="fa-solid fa-circle-check text-[11px]" />
            连接正常
          </span>
        ) : (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${STATUS.neutral}`}>
            <i className="fa-solid fa-power-off text-[11px]" />
            已禁用
          </span>
        )}
        {channel.official && (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${STATUS.brand}`}>
            <i className="fa-solid fa-circle-check text-[11px]" />
            官方插件
          </span>
        )}
      </div>
    </div>
  )
}
