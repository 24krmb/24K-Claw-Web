import type { MenuItem } from '../types'

export const menuItems: MenuItem[] = [
  /*{ key: 'chat', label: '对话', icon: 'fa-solid fa-comments' },*/
  { key: 'agents', label: '主 Agent', icon: 'fa-solid fa-graduation-cap', route: '/agents/mine' },
  { key: 'subagents', label: '子 Agent', icon: 'fa-solid fa-robot', pageTitle: '为不同的 Agent 配置 Subagent' },
  { key: 'team', label: '团队', icon: 'fa-solid fa-user-group', route: '/agents/team' },
  { key: 'tasks', label: '自动化', icon: 'fa-solid fa-clock', pageTitle: '让 Agent 7X24 小时帮你定期执行计划任务' },
  /*{ key: 'knowledge', label: '知识库', icon: 'fa-solid fa-book-open' , pageTitle: '建立知识库体系；可共享、可私有' },*/
  {
    key: 'ability',label: 'Harness',icon: 'fa-solid fa-bolt',
    children: [
      { key: 'commands', label: '命令', icon: 'fa-solid fa-terminal', hideTitle: true },
      { key: 'tools', label: '工具', icon: 'fa-solid fa-screwdriver-wrench', hideTitle: true },
      { key: 'plugins', label: '插件', icon: 'fa-solid fa-plug', hideTitle: true },
      /* { key: 'memory', label: '记忆', icon: 'fa-solid fa-brain' },*/
     { key: 'skills', label: '技能', icon: 'fa-solid fa-wand-magic-sparkles', pageTitle: '为不同的Agent配置不同的技能' },
      { key: 'mcp', label: 'MCP', icon: 'fa-solid fa-server', hideTitle: true },
    ],
  },
  {
    key: 'control',label: 'Control',icon: 'fa-solid fa-sliders',
    children: [
      { key: 'im', label: 'IM', icon: 'fa-solid fa-comment-dots', pageTitle: '接入即时通讯通道，让 Agent 在聊天软件中随时待命' },
      { key: 'acp', label: 'ACP', icon: 'fa-solid fa-right-left', pageTitle: '配置编程CLI Runner，并按 Agent 开启协作' },
    ],
  },
  {
    key: 'management',label: 'Models',icon: 'fa-solid fa-gear',
    children: [
      { key: 'models', label: '模型', icon: 'fa-solid fa-cubes', hideTitle: true },
      { key: 'token', label: 'Token 统计', icon: 'fa-solid fa-coins' },
      /** { key: 'security', label: '安全防护', icon: 'fa-solid fa-shield-halved', pageTitle: '配置工具审批、命令防护、文件访问与敏感信息防护' }, */
    ],
  }
]

export const defaultExpandedGroups = ['ability', 'control', 'management']
export const defaultActiveMenuKey = 'agents'
function findInList(list: MenuItem[], key: string): MenuItem | undefined {
  for (const item of list) {
    if (item.key === key) return item
    const found = item.children ? findInList(item.children, key) : undefined
    if (found) return found
  }
  return undefined
}

export function findMenuItem(key: string): MenuItem | undefined {
  return findInList(menuItems, key)
}

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

export function getMenuRoute(key: string): string {
  const item = findMenuItem(key)
  if (item?.route) return item.route
  const path = findPathInList(menuItems, key)
  return path ? `/${path.join('/')}` : '/agents/mine'
}
