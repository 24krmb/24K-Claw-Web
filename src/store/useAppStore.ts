import { create } from 'zustand'
import { defaultActiveMenuKey, defaultExpandedGroups } from '../data/menu'
interface AppState {
  activeMenuKey: string
  expandedGroups: string[]
  mobileSidebarOpen: boolean
  toolsCategory: string
  pluginsCategory: string
  modelsCategory: string
  setActiveMenuKey: (key: string) => void
  toggleGroup: (key: string) => void
  setMobileSidebarOpen: (open: boolean) => void
  setToolsCategory: (key: string) => void
  setPluginsCategory: (key: string) => void
  setModelsCategory: (key: string) => void
}
export const useAppStore = create<AppState>((set) => ({
  activeMenuKey: defaultActiveMenuKey,
  expandedGroups: defaultExpandedGroups,
  mobileSidebarOpen: false,
  toolsCategory: 'all',
  pluginsCategory: 'installed',
  modelsCategory: 'chat',
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
  setModelsCategory: (key) => set({ modelsCategory: key }),
}))
