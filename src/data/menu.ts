import type { MenuItem } from '../types'

/**
 * 左侧边栏菜单数据（数据驱动渲染，结构见 Develop/Navigation Directory.md）
 * 图标为 Font Awesome 6 Free 的 CSS 类名
 */
export const menuItems: MenuItem[] = [
  { key: 'chat', label: '对话', icon: 'fa-solid fa-comments' },
  { key: 'tasks', label: '自动化', icon: 'fa-solid fa-clock' },
  { key: 'agents', label: '主 Agent', icon: 'fa-solid fa-robot', route: '/agents/mine' },
  { key: 'subagents', label: '子 Agent', icon: 'fa-solid fa-diagram-project', pageTitle: '为不同的Agent 配置 子Agent' },
  {
    key: 'ability',
    label: '能力',
    icon: 'fa-solid fa-bolt',
    children: [
      { key: 'skills', label: '技能', icon: 'fa-solid fa-wand-magic-sparkles' },
      { key: 'plugins', label: '插件', icon: 'fa-solid fa-plug' },
      { key: 'memory', label: '记忆', icon: 'fa-solid fa-brain' },
      { key: 'mcp', label: 'MCP', icon: 'fa-solid fa-server' },
      { key: 'commands', label: '命令', icon: 'fa-solid fa-terminal' },
      { key: 'hooks', label: '钩子', icon: 'fa-solid fa-anchor' },
      { key: 'tools', label: '工具', icon: 'fa-solid fa-screwdriver-wrench' },
    ],
  },
  {
    key: 'control',
    label: '控制',
    icon: 'fa-solid fa-sliders',
    children: [
      { key: 'im', label: 'IM', icon: 'fa-solid fa-comment-dots' },
      { key: 'acp', label: 'ACP', icon: 'fa-solid fa-right-left' },
      { key: 'remote', label: '远程控制', icon: 'fa-solid fa-desktop' },
    ],
  },
  {
    key: 'management',
    label: '管理',
    icon: 'fa-solid fa-gear',
    children: [
      { key: 'models', label: '模型', icon: 'fa-solid fa-cubes' },
      { key: 'token', label: 'Token 统计', icon: 'fa-solid fa-coins' },
      { key: 'storage', label: '存储', icon: 'fa-solid fa-database' },
    ],
  },
]

/** 默认展开的一级菜单分组（默认全部展开） */
export const defaultExpandedGroups = ['ability', 'control', 'management']

/** 默认选中的菜单项 */
export const defaultActiveMenuKey = 'agents'

function findInList(list: MenuItem[], key: string): MenuItem | undefined {
  for (const item of list) {
    if (item.key === key) return item
    const found = item.children ? findInList(item.children, key) : undefined
    if (found) return found
  }
  return undefined
}

/** 在菜单树中按 key 查找菜单项（含子菜单） */
export function findMenuItem(key: string): MenuItem | undefined {
  return findInList(menuItems, key)
}

/** 沿菜单树查找 key 的层级路径（如 skills → ['ability', 'skills']） */
function findPathInList(list: MenuItem[], key: string, parents: string[] = []): string[] | undefined {
  for (const item of list) {
    if (item.key === key) return [...parents, item.key]
    if (item.children) {
      const found = findPathInList(item.children, key, [...parents, item.key])
      if (found) return found
    }
  }
  return undefined
}

/**
 * 菜单点击后的跳转路由：
 * 显式配置了 route 用 route（如「主 Agent」→ /agents/mine）；
 * 否则按菜单层级生成路径——一级项 /subagents、二级项 /ability/skills（结构见 Develop/Navigation Directory.md）
 */
export function getMenuRoute(key: string): string {
  const item = findMenuItem(key)
  if (item?.route) return item.route
  const path = findPathInList(menuItems, key)
  return path ? `/${path.join('/')}` : '/agents/mine'
}
