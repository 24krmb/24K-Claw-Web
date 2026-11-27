import type { IconTone, AcpRunner } from '../types'
import { STATUS, TONE_ICON_BG } from '../lib/tones'

/** 图标块底色（各品牌色调），仅无 LOGO 图片的 Runner 使用 */
const iconToneClasses: Record<IconTone, string> = TONE_ICON_BG

interface AcpRunnerCardProps {
  runner: AcpRunner
  /** 当前启用状态（由页面统一管理） */
  enabled: boolean
  /** 启停切换回调 */
  onToggle: (id: string) => void
}

/** ACP Runner 卡片（样式对齐 ImChannelCard）：圆形品牌图标/LOGO + 名称 + 启停开关（右上角） + 描述 + 状态徽章 */
export default function AcpRunnerCard({ runner, enabled, onToggle }: AcpRunnerCardProps) {
  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md p-5">
      {/* 圆形品牌图标（LOGO 图片优先，无图回退品牌色块） + 名称 + 启停开关（右上角） */}
      <div className="flex items-center gap-3">
        {runner.logo ? (
          <img
            src={runner.logo}
            alt={`${runner.name} LOGO`}
            className="size-10 shrink-0 rounded-full bg-muted object-contain p-1"
          />
        ) : (
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-white ${iconToneClasses[runner.tone]}`}
          >
            <i className={runner.icon} />
          </div>
        )}
        <h3 className="min-w-0 flex-1 truncate text-[15px] font-semibold text-foreground">{runner.name}</h3>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`${runner.name} Runner 启停开关`}
          onClick={() => onToggle(runner.id)}
          className={`relative inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center rounded-full px-0.5 outline-none transition-colors duration-150 after:absolute after:-inset-1.5 after:content-[''] ${
            enabled ? 'bg-success' : 'bg-muted-foreground/30'
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
      <p className="mt-3 text-xs leading-relaxed text-content-secondary">{runner.description}</p>

      {/* 连接状态徽章 */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {enabled ? (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${STATUS.success}`}>
            <i className="fa-solid fa-circle-check text-[11px]" />
            已启用
          </span>
        ) : (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${STATUS.neutral}`}>
            <i className="fa-solid fa-power-off text-[11px]" />
            已禁用
          </span>
        )}
      </div>
    </div>
  )
}
