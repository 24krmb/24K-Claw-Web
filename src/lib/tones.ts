import type { IconTone } from '../types'

/**
 * 语义色调映射（统一 token 层）
 *
 * 此前 7 个卡片组件各自内联了一份完全相同的 15 色映射表，
 * 改一处颜色要改七处，且已出现 `bg-emerald-50` 与 `bg-emerald-500/10` 混用。
 * 这里收敛为单一数据源：新增/调整色调只改本文件。
 *
 * 命名规范：
 * - TONE_ICON_BG    实心图标块底色（白图标）
 * - TONE_ICON_SOFT  浅底 + 彩色文字（工具卡片图标块）
 * - TONE_CARD_TINT  启用态卡片的淡底与描边（跟随品牌色调）
 * - TONE_SWITCH     启用态开关的颜色
 */

/** 实心图标块底色（白图标） */
export const TONE_ICON_BG: Record<IconTone, string> = {
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

/** 浅底 + 彩色文字图标块（暗色模式自动适配） */
export const TONE_ICON_SOFT: Record<IconTone, string> = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  lime: 'bg-lime-500/10 text-lime-600 dark:text-lime-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  slate: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  black: 'bg-black/10 text-neutral-900 dark:bg-white/10 dark:text-neutral-200',
}

/** 启用态卡片淡底 + 描边（跟随品牌色调） */
export const TONE_CARD_TINT: Record<IconTone, string> = {
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

/** 启用态开关颜色 */
export const TONE_SWITCH: Record<IconTone, string> = {
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

/** 状态语义样式（与 CSS token --success / --destructive 呼应；success 为蓝色系，避免与绿色品牌色混淆） */
export const STATUS = {
  /** 运行中 / 已启用 / 成功 */
  success: 'bg-success/10 text-success',
  /** 失败 / 危险 */
  failure: 'bg-destructive/10 text-destructive',
  /** 停用 / 未连接 */
  neutral: 'bg-muted text-muted-foreground',
  /** 品牌强调（官方插件、已添加） */
  brand: 'bg-primary/10 text-primary-text',
} as const
