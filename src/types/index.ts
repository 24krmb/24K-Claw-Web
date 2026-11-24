/** 侧边栏菜单项（支持一级子菜单） */
export interface MenuItem {
  key: string/** 唯一标识，同时用作展开分组的 key */
  label: string/** 菜单文字 */
  icon: string/** Font Awesome 图标类名，如 "fa-solid fa-gauge-high" */
  route?: string/** 自定义跳转路由；缺省为 /m/:key */
  pageTitle?: string/** 页面顶部标题；缺省用 label（菜单文字与页面标题不同时配置） */
  hideTitle?: boolean/** 不显示页面顶部标题（页面自带首行内容时置 true） */
  children?: MenuItem[]/** 子菜单（仅一级嵌套） */
}

/** 顶部标签页 */
export interface TopTab {
  key: string/** 唯一标识，同时用作路由参数 */
  label: string/** 标签文字 */
  icon: string/** Font Awesome 图标类名 */
  badge?: string/** 可选徽标文字（如 BETA） */
}

/** 「我的助理」列表项 */
export interface Assistant {
  id: string/** 唯一标识 */
  name: string/** 助理名称 */
  avatar: string/** 头像图片路径 */
  running: boolean/** 是否运行中 */
  description: string/** 助理描述 */
}

/** 「团队」列表项 */
export interface Team {
  id: string/** 唯一标识 */
  name: string/** 团队名称 */
  avatar: string/** 团队头像路径 */
  running: boolean/** 是否运行中 */
  description: string/** 团队描述 */
  members: string[]/** 成员头像路径列表 */
}

/** 「子 Agent」列表项 */
export interface Subagent {
  id: string/** 唯一标识 */
  name: string/** 显示名称 */
  slug: string/** 标识符（卡片底部等宽字体展示，如 general-purpose） */
  category: 'general' | 'data' | 'quant' | 'news' | 'risk'/** 分类（general 不出现在分类筛选页签中，其余为金融市场子分类） */
  installed: boolean/** 是否已安装 */
  description: string /** 描述 */
}

/** 图标块色调（MCP / 命令等卡片共用） */
export type IconTone =
  | 'blue'
  | 'indigo'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'amber'
  | 'orange'
  | 'red'
  | 'rose'
  | 'violet'
  | 'slate'
  | 'black'

/** 「MCP」列表项 */
export interface McpServer {
  id: string/** 唯一标识 */
  name: string/** 显示名称 */
  icon: string/** Font Awesome 图标类名（卡片左侧品牌色图标块） */
  tone: IconTone/** 图标块色调 */
  installed: boolean/** 是否已添加 */
  description: string/** 描述（卡片内单行截断展示） */
}

/** 「命令」列表项 */
export interface Command {
  id: string/** 唯一标识 */
  name: string/** 命令名（如 /site-deploy） */
  icon: string /** Font Awesome 图标类名（卡片左侧色块图标） */
  tone: IconTone/** 图标块色调 */
  installed: boolean/** 是否已添加 */
  description: string/** 描述（卡片内单行截断展示） */
}

/** 「技能」列表项 */
export interface Skill {
  id: string
  name: string
  icon: string/** Font Awesome 图标类名（卡片左上角彩色图标块） */
  tone: 'violet' | 'sky' | 'emerald' | 'rose' | 'amber' | 'slate'/** 图标块色调 */
  category: 'builtin' | 'pack'/** 来源分类（对应技能页页签：内置 / 技能包） */
  enabled: boolean/** 是否已启用 */
  skillCount?: number/** 包含的技能数（仅技能包分类使用，徽章显示「N 个技能」） */
  description: string/** 描述 */
}

/** 「模型」列表项 */
export interface Model {
  id: string
  name: string
  logo?: string/** 模型 LOGO 图片路径（public/images/models 下的文件）；配置后忽略 icon/tone */
  icon?: string/** Font Awesome 图标类名*/
  tone?: IconTone/** 图标块色调 */
  category: 'chat' | 'stt-tts' | 'embedding' | 'system' | 'search'/** 模型分类（对应模型页页签） */
  enabled: boolean/** 是否已启用 */
}

/** 「自动化」定时任务列表项 */
export interface Task {
  id: string/** 任务 ID */
  name: string/** 任务名称 */
  enabled: boolean/** 是否已启用 */
  schedule: string/** 调度 cron 表达式 */
  type: string/** 任务类型名称（如 智能体） */
  typeNote: string/** 类型备注（如 AI 处理请求） */
  prompt: string/** 指令内容 */
  lastRun: string/** 上次执行时间 */
  lastStatus: 'success' | 'failure'/** 上次执行状态 */
  newSession: boolean/** 是否开启新会话 */
}

/** 「插件」列表项 */
export interface Plugin {
  id: string/** 唯一标识 */
  name: string/** 显示名称 */
  icon: string/** Font Awesome 图标类名（卡片左上角彩色图标块） */
  tone: IconTone/** 图标块色调 */
  category: '影音' | '百科' | '资讯' | '生活' | '工具' | '运维' | '趣味' | '金融'/** 功能分类（卡片小标签） */
  version: string/** 插件版本（如 v0.2.4） */
  enabled: boolean/** 是否已加载（启用） */
  description: string/** 描述 */
}

/** 「工具」列表项 */
export interface Tool {
  id: string/** 工具标识符（如 read_account，卡片内等宽字体展示） */
  name: string/** 显示名称 */
  icon: string/** Font Awesome 图标类名（卡片左侧色块图标） */
  tone: IconTone/** 图标块色调 */
  category: '交易' | '记忆' | '文件与终端' | '网页浏览' | '媒体' | '自动化' | '知识库' | '手机' | '助理' | '其他'/** 工具分类 */
}

/** 「IM 通道」列表项 */
export interface ImChannel {
  id: string/** 唯一标识 */
  name: string/** 通道名称 */
  icon: string/** Font Awesome 图标类名（卡片圆形图标） */
  tone: IconTone/** 品牌色调（图标块与启用态卡片底色） */
  enabled: boolean/** 是否已启用 */
  description: string/** 一句话说明 */
  official?: boolean/** 是否为官方插件（卡片显示「官方插件」徽章） */
}

/** 「ACP Runner」列表项（外部编程专家连接器） */
export interface AcpRunner {
  id: string/** 唯一标识 */
  name: string/** Runner 名称 */
  icon: string/** Font Awesome 图标类名（卡片方形图标块） */
  tone: IconTone/** 图标块色调 */
  logo?: string/** 品牌 LOGO 图片路径（public 下绝对路径，有则优先于 icon 色块显示） */
  enabled: boolean/** 是否已启用 */
  description: string/** 一句话说明 */
}
