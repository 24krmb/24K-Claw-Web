import McpCard from '../components/McpCard'
import AbilityTabs from '../components/AbilityTabs'
import { mcpServers } from '../data/mcp'

/** 「MCP」菜单页：能力页签栏（MCP 选中）+ MCP 服务器卡片网格 */
export default function McpPage() {
  return (
    <div>
      {/* 页签：命令（左）/ 工具 / MCP（选中）/ 插件（右） */}
      <AbilityTabs activeKey="mcp" />

      {/* MCP 服务器卡片网格：桌面端一行 3 个，中屏 2 个，窄屏单列 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mcpServers.map((server) => (
          <McpCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}
