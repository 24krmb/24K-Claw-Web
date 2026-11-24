# 24K-Claw-Web

24KCLAW Agent 的 Web 前端：左侧多级菜单 + 顶部标签页 + 卡片网格。

## 技术栈

Vite 6 + React 18 + TypeScript(strict) + Tailwind CSS v4 + React Router v7 + Zustand 5 + Font Awesome 6 Free。构建端口 5173。

> 未使用任何 UI 组件库，全部组件手写。

## 目录结构

```
src/
├── main.tsx              # 入口：引入 Font Awesome 与全局样式，挂载路由
├── App.tsx               # 路由：标签页 /agents/:tabKey + 菜单 /:menuKey、/:groupKey/:menuKey
├── index.css             # Tailwind v4 入口 + 全局基础样式（@theme 主题令牌）
├── types/index.ts        # MenuItem
├── data/
│   ├── menu.ts           # 侧边栏菜单树 + 路由生成（getMenuRoute）
│   ├── tabs.ts           # 顶部标签页数据（mine / team）
│   ├── assistants.ts     # 助理列表（主 Agent）
│   ├── teams.ts          # 团队列表
│   ├── subagents.ts      # 子 Agent 列表（金融任务型：数据/量化/资讯/风控）
│   ├── skills.ts         # 技能列表（内置技能 / 技能包）
│   ├── models.ts         # 模型列表
│   ├── tasks.ts          # 定时任务列表（自动化页）
│   ├── plugins.ts        # 插件列表（已安装插件）
│   ├── tools.ts          # 工具列表（全部 + 10 分类）
│   ├── mcp.ts            # MCP 服务器列表
│   ├── imChannels.ts     # IM 通道列表（微信/QQ/企微/飞书/WhatsApp/Teams 等 18 个通道，含 Signal/Slack 等 5 个官方插件）
│   └── commands.ts       # 命令列表（/xxx 快捷命令）
├── store/useAppStore.ts  # Zustand：选中菜单 / 展开分组 / 移动端抽屉 / 工具页·插件页顶栏页签
├── components/
│   ├── Sidebar.tsx       # 左侧边栏（Logo + 版本切换 + 多级菜单）
│   ├── VersionSwitcher.tsx # LOGO 右侧版本切换（演示版；正式版新窗口打开 claw.24krmb.com）
│   ├── MenuItemRow.tsx   # 单个菜单行（含子菜单展开/收起过渡）
│   ├── TopTabs.tsx       # 顶部标签页导航 / 菜单页标题或自定义页签组 + 明暗切换
│   ├── AssistantCard.tsx # 助理卡片
│   ├── AssistantPicker.tsx # 助理选择器（子 Agent / 技能页按助理筛选）
│   ├── TeamCard.tsx      # 团队卡片
│   ├── SubagentCard.tsx  # 子 Agent 卡片
│   ├── SkillCard.tsx     # 技能卡片
│   ├── ModelCard.tsx     # 模型卡片（LOGO 白底块 / 图标色块 + 启停）
│   ├── PluginCard.tsx    # 插件卡片（图标色块 + 元信息标签 + 开关/卸载）
│   ├── ToolCard.tsx      # 工具卡片（图标色块 + 名称 + 分类徽章 + 标识符）
│   ├── ImChannelCard.tsx # IM 通道卡片（圆形品牌色图标 + 启停开关 + 连接状态徽章）
│   ├── McpCard.tsx       # MCP 服务器卡片（图标色块 + 添加/移除）
│   └── CommandCard.tsx   # 命令卡片（图标色块 + 命令名 + 添加/移除）
└── pages/
    ├── WorkspacePage.tsx # 工作区布局骨架 + 路由分支（所有页面从这里分发）
    ├── MyAssistantsPage.tsx # /agents/mine 助理卡片网格
    ├── TeamPage.tsx      # /agents/team 团队卡片网格
    ├── SubagentsPage.tsx # /subagents 子 Agent 页（助理筛选 + 分类页签）
    ├── SkillsPage.tsx    # /ability/skills 技能页（助理筛选 + 来源页签）
    ├── ModelsPage.tsx    # /management/models 模型页（分类页签渲染在顶栏 + 卡片网格）
    ├── TasksPage.tsx     # /tasks 自动化页（搜索条 + 表格/卡片双视图）
    ├── ImPage.tsx        # /control/im IM 页（通道统计行 + 通道卡片网格）
    ├── PluginsPage.tsx   # /ability/plugins 插件页（页签渲染在顶栏 + 开发指南 + 卡片/表格双视图）
    ├── ToolsPage.tsx     # /ability/tools 工具页（分类页签渲染在顶栏 + 卡片网格）
    ├── McpPage.tsx       # /ability/mcp MCP 页（页签渲染在顶栏 + 服务器卡片网格）
    ├── CommandsPage.tsx  # /ability/commands 命令页（页签渲染在顶栏 + 命令卡片网格）
    └── PlaceholderPage.tsx # 未实现菜单的占位页
```
## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 3. 生产构建
npm run build

# 4. 本地预览构建产物
npm run preview
```

## 页面与文件映射

所有路由都渲染 `src/pages/WorkspacePage.tsx`（布局骨架），由它在内部按路由参数分支到具体页面。

| 页面 | 路由 | 页面文件 | 卡片组件 | 数据文件 |
| --- | --- | --- | --- | --- |
| 助理（主 Agent） | `/agents/mine` | `src/pages/MyAssistantsPage.tsx` | `src/components/AssistantCard.tsx` | `src/data/assistants.ts` |
| 团队 | `/agents/team` | `src/pages/TeamPage.tsx` | `src/components/TeamCard.tsx` | `src/data/teams.ts` |
| 子 Agent | `/subagents` | `src/pages/SubagentsPage.tsx` | `src/components/SubagentCard.tsx` | `src/data/subagents.ts` |
| 自动化 | `/tasks` | `src/pages/TasksPage.tsx` | —（表格/卡片内联） | `src/data/tasks.ts` |
| 技能 | `/ability/skills` | `src/pages/SkillsPage.tsx` | `src/components/SkillCard.tsx` | `src/data/skills.ts` |
| 插件 | `/ability/plugins` | `src/pages/PluginsPage.tsx` | `src/components/PluginCard.tsx` | `src/data/plugins.ts` |
| 工具 | `/ability/tools` | `src/pages/ToolsPage.tsx` | `src/components/ToolCard.tsx` | `src/data/tools.ts` |
| MCP | `/ability/mcp` | `src/pages/McpPage.tsx` | `src/components/McpCard.tsx` | `src/data/mcp.ts` |
| 命令 | `/ability/commands` | `src/pages/CommandsPage.tsx` | `src/components/CommandCard.tsx` | `src/data/commands.ts` |
| 模型 | `/management/models` | `src/pages/ModelsPage.tsx` | `src/components/ModelCard.tsx` | `src/data/models.ts` |
| 占位页（未实现菜单） | 其余菜单/标签 | `src/pages/PlaceholderPage.tsx` | — | — |

### 路由规则（`src/App.tsx`）

| 规则 | 说明 |
| --- | --- |
| `/` | 重定向到 `/agents/mine`（默认标签页） |
| `/agents/:tabKey` | 标签页路由：`mine` → 助理、`team` → 团队，其余占位 |
| `/:menuKey` | 一级菜单路由：如 `/subagents` |
| `/:groupKey/:menuKey` | 二级菜单路由：如 `/ability/skills` |
| `*` | 兜底重定向到默认标签页 |

菜单路由由 `src/data/menu.ts` 的 `getMenuRoute()` 按菜单树层级生成；顶部标题用菜单项的 `pageTitle`（缺省用 `label`）。

### 布局骨架文件

| 文件 | 职责 |
| --- | --- |
| `src/pages/WorkspacePage.tsx` | 布局骨架：侧边栏 + 顶栏 + 内容区路由分支 |
| `src/components/Sidebar.tsx` | 左侧边栏（Logo + 多级菜单） |
| `src/components/MenuItemRow.tsx` | 单个菜单行（含子菜单展开/收起过渡） |
| `src/components/TopTabs.tsx` | 顶部栏：标签页路由渲染标签组，菜单页渲染页面标题或自定义页签组（`menuTabs`），右侧明暗切换 |

### 页签组织方式

菜单页内的页签有两种呈现机制：

- **顶栏页签**（`TopTabs` 的 `menuTabs`）：页签渲染进顶栏，样式与标签页（/agents/mine）一致——图标 + 文字 + 选中态主色指示条。用于工具页的「全部 + 10 分类」（`toolTabList`）、插件页的「已安装插件 / 插件开发」（`pluginTabList`）、模型页的 5 个分类（`modelTabList`）、命令页与 MCP 页的单页签（`commandTabList` / `mcpTabList`），均由对应页面文件导出、`WorkspacePage.tsx` 负责传入，多页签页选中状态存于 `useAppStore`（`toolsCategory` / `pluginsCategory` / `modelsCategory`）
- 其余页面（子 Agent / 技能等）的页签为页面自有的内联页签

## 布局要点

- 侧边栏固定 220px（`w-[220px]`），桌面端固定、窄屏（<1024px）变为抽屉 + 遮罩
- 卡片网格：`grid-cols-[repeat(auto-fill,minmax(320px,1fr))]`，窗口缩放自动换列（各页面一致）
- 子菜单展开/收起使用 `grid-rows-[1fr]/[0fr]` 高度过渡，无需测量高度
- 菜单页标题与标签页左缘对齐内容区（24px，`ml-6` / `lg:pl-1`）
- 品牌色随明暗主题切换（浅色靛蓝 / 深色暖橙），阴影用 `--shadow-color` 语义变量

## 二次开发提示

- 新增菜单：在 `src/data/menu.ts` 中追加一项（含 Font Awesome 类名），路由自动按层级生成
- 新增页面：新建 `pages/XxxPage.tsx` → `WorkspacePage.tsx` 加分支 → 页面数据放 `data/`
- 顶部标题：菜单项配 `pageTitle`；卡片网格直接复用 `minmax(320px,1fr)` 保持各页列数一致

## 关于我们

[24KRMB.COM](https://www.24krmb.com)实战交流社区成立于 2012 年，社区实行实名认证与实盘认证制度。全网唯一 AI + A股/期货量化实战交流社区：股票、期货、期权的实战技术、实战案例、宏观分析、AI 量化投资实战交流。

🔗 网址：<https://www.24krmb.com>
