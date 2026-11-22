import { useState } from 'react'
import { myAssistants } from '../data/assistants'

interface AssistantPickerProps {
  /** 选中变化回调（可选，页面需要响应选中时使用） */
  onChange?: (assistantId: string) => void
}

/** 助理选择条：运行中助理药丸列表（卡片色药丸 + 品牌色选中态），默认选中第一个运行中的 */
export default function AssistantPicker({ onChange }: AssistantPickerProps) {
  const runningAssistants = myAssistants.filter((a) => a.running)
  const [selectedId, setSelectedId] = useState(runningAssistants[0]?.id ?? '')

  return (
    <div className="flex flex-wrap items-center gap-4" role="group" aria-label="选择助理">
      {runningAssistants.map((assistant) => {
        const selected = assistant.id === selectedId
        return (
          <button
            key={assistant.id}
            type="button"
            onClick={() => {
              setSelectedId(assistant.id)
              onChange?.(assistant.id)
            }}
            className={`flex h-7 cursor-pointer items-center gap-2 rounded-full border bg-card pr-3 text-sm font-medium outline-none transition-colors duration-150 ${
              selected
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-border text-foreground hover:bg-accent'
            }`}
          >
            <img
              src={assistant.avatar}
              alt=""
              className="size-7 rounded-full border border-border object-cover"
            />
            <span>{assistant.name}</span>
          </button>
        )
      })}
    </div>
  )
}
