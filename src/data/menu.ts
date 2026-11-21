import type { MenuItem } from '../types'

/**
 * 左侧边栏菜单数据（数据驱动渲染）
 * 图标为 Font Awesome 6 Free 的 CSS 类名
 */
export const menuItems: MenuItem[] = [
  { key: 'dashboard', label: '仪表盘', icon: 'fa-solid fa-gauge-high' },
  { key: 'layout', label: '布局', icon: 'fa-solid fa-table-cells-large' },
  { key: 'mailbox', label: '邮箱', icon: 'fa-solid fa-envelope' },
  { key: 'apps', label: '应用', icon: 'fa-solid fa-table-cells' },
  { key: 'charts', label: '图表', icon: 'fa-solid fa-chart-line' },
  { key: 'ui-components', label: 'UI 组件', icon: 'fa-solid fa-shapes' },
  { key: 'icons', label: '图标库', icon: 'fa-solid fa-icons' },
  {
    key: 'assistant-center',
    label: '助理中心',
    icon: 'fa-solid fa-robot',
    children: [
      { key: 'memory-overview', label: '记忆概览', icon: 'fa-solid fa-brain' },
      { key: 'built-in-assistant', label: '内置助理', icon: 'fa-solid fa-wand-magic-sparkles' },
      { key: 'sub-agent-market', label: '子代理市场', icon: 'fa-solid fa-store' },
      { key: 'scheduled-tasks', label: '定时任务', icon: 'fa-solid fa-clock' },
      { key: 'knowledge-base', label: '知识库', icon: 'fa-solid fa-book' },
      { key: 'token-usage', label: 'Token 消耗', icon: 'fa-solid fa-coins' },
      { key: 'built-in-tools', label: '内置工具', icon: 'fa-solid fa-screwdriver-wrench' },
      { key: 'coding-assistant', label: '编程助理', icon: 'fa-solid fa-code' },
      { key: 'plugins', label: '插件', icon: 'fa-solid fa-plug' },
    ],
  },
  { key: 'widgets', label: '小部件', icon: 'fa-solid fa-bookmark' },
  { key: 'forms', label: '表单', icon: 'fa-solid fa-pen-to-square' },
]

/** 默认展开的一级菜单分组 */
export const defaultExpandedGroups = ['assistant-center']

/** 默认选中的菜单项 */
export const defaultActiveMenuKey = 'built-in-assistant'
