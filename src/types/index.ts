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
  /** 页面顶部标题；缺省用 label（菜单文字与页面标题不同时配置） */
  pageTitle?: string
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

/** 「子 Agent」列表项 */
export interface Subagent {
  /** 唯一标识 */
  id: string
  /** 显示名称 */
  name: string
  /** 标识符（卡片底部等宽字体展示，如 general-purpose） */
  slug: string
  /** 分类（general 不出现在分类筛选页签中，其余为金融市场子分类） */
  category: 'general' | 'data' | 'quant' | 'news' | 'risk'
  /** 是否已安装 */
  installed: boolean
  /** 描述 */
  description: string
}

/** 图标块色调（MCP / 命令等卡片共用） */
export type IconTone =
  | 'blue'
  | 'indigo'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'lime'
  | 'amber'
  | 'orange'
  | 'red'
  | 'rose'
  | 'violet'
  | 'slate'

/** 「MCP」列表项 */
export interface McpServer {
  /** 唯一标识 */
  id: string
  /** 显示名称 */
  name: string
  /** Font Awesome 图标类名（卡片左侧品牌色图标块） */
  icon: string
  /** 图标块色调 */
  tone: IconTone
  /** 是否已添加 */
  installed: boolean
  /** 描述（卡片内单行截断展示） */
  description: string
}

/** 「命令」列表项 */
export interface Command {
  /** 唯一标识 */
  id: string
  /** 命令名（如 /site-deploy） */
  name: string
  /** Font Awesome 图标类名（卡片左侧色块图标） */
  icon: string
  /** 图标块色调 */
  tone: IconTone
  /** 是否已添加 */
  installed: boolean
  /** 描述（卡片内单行截断展示） */
  description: string
}

/** 「技能」列表项 */
export interface Skill {
  /** 唯一标识 */
  id: string
  /** 显示名称 */
  name: string
  /** Font Awesome 图标类名（卡片左上角彩色图标块） */
  icon: string
  /** 图标块色调 */
  tone: 'violet' | 'sky' | 'emerald' | 'rose' | 'amber' | 'slate'
  /** 来源分类（对应技能页页签：内置 / 技能包） */
  category: 'builtin' | 'pack'
  /** 是否已启用 */
  enabled: boolean
  /** 包含的技能数（仅技能包分类使用，徽章显示「N 个技能」） */
  skillCount?: number
  /** 描述 */
  description: string
}

/** 「模型」列表项 */
export interface Model {
  /** 唯一标识 */
  id: string
  /** 显示名称 */
  name: string
  /** 模型 LOGO 图片路径（public/images/models 下的文件）；配置后忽略 icon/tone */
  logo?: string
  /** Font Awesome 图标类名（无 LOGO 时显示的色块图标） */
  icon?: string
  /** 图标块色调（无 LOGO 时显示的色块图标） */
  tone?: IconTone
  /** 模型分类（对应模型页页签：Chat Models / STT·TTS / Embedding / System One / Search） */
  category: 'chat' | 'stt-tts' | 'embedding' | 'system' | 'search'
  /** 是否已启用 */
  enabled: boolean
}
