/** 侧边栏菜单项（支持一级子菜单） */
export interface MenuItem {
  /** 唯一标识，同时用作展开分组的 key */
  key: string
  /** 菜单文字 */
  label: string
  /** Font Awesome 图标类名，如 "fa-solid fa-gauge-high" */
  icon: string
  /** 自定义跳转路由；缺省为 /m/:key */
  route?: string
  /** 子菜单（仅一级嵌套） */
  children?: MenuItem[]
}

/** 顶部标签页 */
export interface TopTab {
  /** 唯一标识，同时用作路由参数 */
  key: string
  /** 标签文字 */
  label: string
  /** Font Awesome 图标类名 */
  icon: string
  /** 可选徽标文字（如 BETA） */
  badge?: string
}

/** 「我的助理」列表项 */
export interface Assistant {
  /** 唯一标识 */
  id: string
  /** 助理名称 */
  name: string
  /** 头像图片路径 */
  avatar: string
  /** 是否运行中 */
  running: boolean
  /** 助理描述 */
  description: string
}

/** 「团队」列表项 */
export interface Team {
  /** 唯一标识 */
  id: string
  /** 团队名称 */
  name: string
  /** 团队头像路径 */
  avatar: string
  /** 是否运行中 */
  running: boolean
  /** 团队描述 */
  description: string
  /** 成员头像路径列表 */
  members: string[]
}
