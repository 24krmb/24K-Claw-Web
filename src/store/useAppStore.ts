import { create } from 'zustand'
import { defaultActiveMenuKey, defaultExpandedGroups } from '../data/menu'

interface AppState {
  /** 当前选中的侧边栏菜单 key */
  activeMenuKey: string
  /** 当前展开的一级菜单分组 key 列表 */
  expandedGroups: string[]
  /** 移动端侧边栏抽屉是否打开 */
  mobileSidebarOpen: boolean
  /** 工具页顶栏选中的分类页签 key（'all' 或分类名，由顶栏页签与卡片网格共用） */
  toolsCategory: string
  /** 插件页顶栏选中的页签 key（'installed' / 'develop'，由顶栏页签与内容区共用） */
  pluginsCategory: string

  /** 选中菜单项 */
  setActiveMenuKey: (key: string) => void
  /** 切换一级菜单分组的展开/收起 */
  toggleGroup: (key: string) => void
  /** 打开/关闭移动端侧边栏抽屉 */
  setMobileSidebarOpen: (open: boolean) => void
  /** 切换工具页分类页签 */
  setToolsCategory: (key: string) => void
  /** 切换插件页顶栏页签 */
  setPluginsCategory: (key: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeMenuKey: defaultActiveMenuKey,
  expandedGroups: defaultExpandedGroups,
  mobileSidebarOpen: false,
  toolsCategory: 'all',
  pluginsCategory: 'installed',

  setActiveMenuKey: (key) => set({ activeMenuKey: key }),

  toggleGroup: (key) =>
    set((state) => ({
      expandedGroups: state.expandedGroups.includes(key)
        ? state.expandedGroups.filter((k) => k !== key)
        : [...state.expandedGroups, key],
    })),

  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

  setToolsCategory: (key) => set({ toolsCategory: key }),

  setPluginsCategory: (key) => set({ pluginsCategory: key }),
}))
