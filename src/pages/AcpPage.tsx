import { useState } from 'react'
import AcpRunnerCard from '../components/AcpRunnerCard'
import AssistantPicker from '../components/AssistantPicker'
import { acpRunners } from '../data/acpRunners'

/** 「ACP」菜单页：助理选择条（Agent 药丸）+ Runner 配置容器（说明 + 添加按钮 + Runner 卡片网格） */
export default function AcpPage() {
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(
    Object.fromEntries(acpRunners.map((r) => [r.id, r.enabled])),
  )
  const toggleEnabled = (id: string) =>
    setEnabledMap((m) => ({ ...m, [id]: !m[id] }))

  return (
    <div>
      {/* 助理选择条：当前配置 Runner 的目标专家（仅运行中），复用项目 Agent 药丸 */}
      <AssistantPicker />

      {/* Runner 配置容器：说明 + 添加按钮 + 卡片网格 */}
      <div className="mt-6 rounded-xl bg-muted/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="min-w-0 text-sm text-muted-foreground">以下 Runner 配置对该账号下所选中的 Agent 生效。</p>
          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm outline-none transition-colors duration-150 hover:bg-primary/90"
          >
            添加 Runner
          </button>
        </div>

        {/* Runner 卡片网格（桌面端一行 4 个，与插件页一致） */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {acpRunners.map((runner) => (
            <AcpRunnerCard
              key={runner.id}
              runner={runner}
              enabled={enabledMap[runner.id]}
              onToggle={toggleEnabled}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
