import McpCard from '../components/McpCard'
import { mcpServers } from '../data/mcp'

/** 顶栏页签（MCP），供 WorkspacePage 传给 TopTabs 渲染（样式与其他能力页一致） */
export const mcpTabList: { key: string; label: string; icon: string }[] = [
  { key: 'mcp', label: 'MCP', icon: 'fa-solid fa-server' },
]

/** 「MCP」菜单页：页签渲染在顶栏（由 TopTabs 呈现）+ MCP 服务器卡片网格 */
export default function McpPage() {
  return (
    <div>
      {/* MCP 服务器卡片网格：桌面端一行 3 个，中屏 2 个，窄屏单列 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mcpServers.map((server) => (
          <McpCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}
