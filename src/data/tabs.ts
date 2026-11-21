import type { TopTab } from '../types'

/**
 * 顶部标签页数据（数据驱动渲染）
 * key 同时用作路由参数：/agents/:tabKey
 */
export const topTabs: TopTab[] = [
  { key: 'built-in', label: '内置 Agent', icon: 'fa-solid fa-file-pen' },
  { key: 'mine', label: '我的 Agent', icon: 'fa-solid fa-graduation-cap' },
  { key: 'team', label: '我的团队', icon: 'fa-solid fa-users' },
  { key: 'shared', label: '共享', icon: 'fa-solid fa-briefcase' },
]

/** 默认选中的标签页 */
export const defaultTabKey = 'built-in'
