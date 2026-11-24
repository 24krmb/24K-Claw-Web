import { useState } from 'react'
import ImChannelCard from '../components/ImChannelCard'
import { imChannels } from '../data/imChannels'

/** 「IM」菜单页：通道统计行 + 通道卡片网格（启用状态页面内管理） */
export default function ImPage() {
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(
    Object.fromEntries(imChannels.map((c) => [c.id, c.enabled])),
  )
  const toggleEnabled = (id: string) =>
    setEnabledMap((m) => ({ ...m, [id]: !m[id] }))
  const configured = Object.values(enabledMap).filter(Boolean).length

  return (
    <div>
      {/* 统计行：通道数（左） + 刷新（右） */}
      <div className="flex items-center justify-between pb-4">
        <p className="text-sm text-foreground">
          当前支持 {imChannels.length} 个通道，已配置 {configured} 个
        </p>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 rounded-lg border bg-card px-3 py-1.5 text-sm text-foreground outline-none transition-colors duration-150 hover:bg-accent"
        >
          <i className="fa-solid fa-rotate-right text-xs" />
          刷新
        </button>
      </div>

      {/* 通道卡片网格：桌面端一行 4 个，中屏 2 个，窄屏单列 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {imChannels.map((channel) => (
          <ImChannelCard
            key={channel.id}
            channel={channel}
            enabled={enabledMap[channel.id]}
            onToggle={toggleEnabled}
          />
        ))}
      </div>
    </div>
  )
}
