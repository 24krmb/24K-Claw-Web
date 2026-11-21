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
}

/** Agent 模板卡片 */
export interface AgentTemplate {
  /** 唯一标识 */
  id: string
  /** 模板名称 */
  name: string
  /** 模板描述 */
  description: string
  /** 头像图片路径（public/images/avatars/ 下的静态资源，如 /images/avatars/1.png） */
  avatar: string
}
