# 24K-Claw-Web

24KCLAW Agent 的 Web 前端：左侧多级菜单 + 顶部标签页 + 卡片网格。

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 构建 | Vite 6 |
| 框架 | React 18 + TypeScript（strict） |
| 样式 | Tailwind CSS v4 |
| 图标 | Font Awesome 6 Free（CSS 类方式） |
| 路由 | React Router v7 |
| 状态 | Zustand 5 |

> 未使用任何 UI 组件库，全部组件手写。

## 页面与文件映射

所有路由都渲染 `src/pages/WorkspacePage.tsx`（布局骨架），由它在内部按路由参数分支到具体页面。

| 页面 | 路由 | 页面文件 | 卡片组件 | 数据文件 |
| --- | --- | --- | --- | --- |
| 助理（主 Agent） | `/agents/mine` | `src/pages/MyAssistantsPage.tsx` | `src/components/AssistantCard.tsx` | `src/data/assistants.ts` |
| 团队 | `/agents/team` | `src/pages/TeamPage.tsx` | `src/components/TeamCard.tsx` | `src/data/teams.ts` |
| 子 Agent | `/subagents` | `src/pages/SubagentsPage.tsx` | `src/components/SubagentCard.tsx` | `src/data/subagents.ts` |
| 技能 | `/ability/skills` | `src/pages/SkillsPage.tsx` | `src/components/SkillCard.tsx` | `src/data/skills.ts` |
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
| `src/components/TopTabs.tsx` | 顶部栏：标签页路由渲染标签组，菜单页渲染页面标题，右侧明暗切换 |

## 目录结构

```
src/
├── main.tsx              # 入口：引入 Font Awesome 与全局样式，挂载路由
├── App.tsx               # 路由：标签页 /agents/:tabKey + 菜单 /:menuKey、/:groupKey/:menuKey
├── index.css             # Tailwind v4 入口 + 全局基础样式（@theme 主题令牌）
├── types/index.ts        # MenuItem / TopTab / Assistant / Team / Subagent / Skill 类型
├── data/
│   ├── menu.ts           # 侧边栏菜单树 + 路由生成（getMenuRoute）
│   ├── tabs.ts           # 顶部标签页数据（mine / team）
│   ├── assistants.ts     # 助理列表（主 Agent）
│   ├── teams.ts          # 团队列表
│   ├── subagents.ts      # 子 Agent 列表（金融任务型：数据/量化/资讯/风控）
│   └── skills.ts         # 技能列表（内置技能 / 技能包）
├── store/useAppStore.ts  # Zustand：选中菜单 / 展开分组 / 移动端抽屉
├── components/
│   ├── Sidebar.tsx       # 左侧边栏（Logo + 多级菜单）
│   ├── MenuItemRow.tsx   # 单个菜单行（含子菜单展开/收起过渡）
│   ├── TopTabs.tsx       # 顶部标签页导航 / 菜单页标题 + 明暗切换
│   ├── AssistantCard.tsx # 助理卡片
│   ├── TeamCard.tsx      # 团队卡片
│   ├── SubagentCard.tsx  # 子 Agent 卡片
│   └── SkillCard.tsx     # 技能卡片
└── pages/
    ├── WorkspacePage.tsx # 工作区布局骨架 + 路由分支（所有页面从这里分发）
    ├── MyAssistantsPage.tsx # /agents/mine 助理卡片网格
    ├── TeamPage.tsx      # /agents/team 团队卡片网格
    ├── SubagentsPage.tsx # /subagents 子 Agent 页（分类页签 + 筛选）
    ├── SkillsPage.tsx    # /ability/skills 技能页（来源页签 + 筛选）
    └── PlaceholderPage.tsx # 未实现菜单的占位页
```

## 布局要点

- 侧边栏固定 220px（`w-[220px]`），桌面端固定、窄屏（<1024px）变为抽屉 + 遮罩
- 卡片网格：`grid-cols-[repeat(auto-fill,minmax(320px,1fr))]`，窗口缩放自动换列（各页面一致）
- 子菜单展开/收起使用 `grid-rows-[1fr]/[0fr]` 高度过渡，无需测量高度
- 菜单页标题与标签页左缘对齐内容区（24px，`ml-6` / `lg:pl-1`）
- 品牌色随明暗主题切换（浅色靛蓝 / 深色暖橙），阴影用 `--shadow-color` 语义变量

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

## 二次开发提示

- 新增菜单：在 `src/data/menu.ts` 中追加一项（含 Font Awesome 类名），路由自动按层级生成
- 新增页面：新建 `pages/XxxPage.tsx` → `WorkspacePage.tsx` 加分支 → 页面数据放 `data/`
- 顶部标题：菜单项配 `pageTitle`；卡片网格直接复用 `minmax(320px,1fr)` 保持各页列数一致
