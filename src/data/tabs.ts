import type { TopTab } from '../types'

/**
 * 顶部标签页数据（数据驱动渲染）
 * key 同时用作路由参数：/agents/:tabKey
 */
export const topTabs: TopTab[] = [
  { key: 'mine', label: '助理', icon: 'fa-solid fa-graduation-cap' },
  { key: 'team', label: '团队', icon: 'fa-solid fa-users' },
]

/** 默认选中的标签页 */
export const defaultTabKey = 'mine'
