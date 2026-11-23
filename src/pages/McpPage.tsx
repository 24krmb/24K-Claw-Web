import McpCard from '../components/McpCard'
import { mcpServers } from '../data/mcp'

/** 「MCP」菜单页：MCP 服务器卡片网格（样式对照设计稿 Develop/mcp.png） */
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
