import AssistantCard from '../components/AssistantCard'
import { myAssistants } from '../data/assistants'

/** 「我的助理」标签页：助理卡片网格 */
export default function MyAssistantsPage() {
  if (myAssistants.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 text-muted-foreground">
        <i className="fa-regular fa-folder-open text-3xl" />
        <p className="text-sm">暂无助理</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {myAssistants.map((assistant) => (
          <AssistantCard key={assistant.id} assistant={assistant} />
        ))}
      </div>
    </div>
  )
}
