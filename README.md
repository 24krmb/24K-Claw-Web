# 24K-Claw-Web

24KCLAW Agent 助理中心的 Web 前端：左侧多级菜单 + 顶部标签页 + Agent 卡片网格。

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

## 目录结构

```
src/
├── main.tsx              # 入口：引入 Font Awesome 与全局样式，挂载路由
├── App.tsx               # 路由：/ 重定向到 /agents/built-in
├── index.css             # Tailwind v4 入口 + 全局基础样式
├── types/index.ts        # MenuItem / TopTab / AgentTemplate 类型
├── data/
│   ├── menu.ts           # 侧边栏菜单数据（含「助理中心」子菜单）
│   ├── tabs.ts           # 顶部标签页数据
│   └── agents.ts         # Agent 模板卡片数据
├── store/useAppStore.ts  # Zustand：选中菜单 / 展开分组 / 移动端抽屉
├── components/
│   ├── Sidebar.tsx       # 左侧边栏（Logo + 多级菜单）
│   ├── MenuItemRow.tsx   # 单个菜单行（含子菜单展开/收起过渡）
│   ├── TopTabs.tsx       # 顶部标签页导航
│   ├── AgentCard.tsx     # Agent 模板卡片
│   └── AgentGrid.tsx     # 卡片网格（auto-fill 自适应换列）
└── pages/
    ├── WorkspacePage.tsx # 工作区页面（布局骨架 + 路由参数派生标签）
    └── PlaceholderPage.tsx # 其他标签页占位
```

## 布局要点

- 侧边栏固定 220px（`w-[220px]`），桌面端固定、窄屏（<1024px）变为抽屉 + 遮罩
- 卡片网格：`grid-cols-[repeat(auto-fill,minmax(320px,1fr))]`，窗口缩放自动换列
- 子菜单展开/收起使用 `grid-rows-[1fr]/[0fr]` 高度过渡，无需测量高度
- 标签页选中态：靛蓝文字 + 底部 2px 指示条，对应路由 `/agents/:tabKey`

## 二次开发提示

- 新增菜单：在 `src/data/menu.ts` 中追加一项即可（含 Font Awesome 类名）
- 新增标签页：在 `src/data/tabs.ts` 追加，内容渲染在 `WorkspacePage.tsx` 的分支里
- 「从此模板新建」按钮当前仅 `console.log`，接入真实逻辑见 `AgentCard.tsx`
