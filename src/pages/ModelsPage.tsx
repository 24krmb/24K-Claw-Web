import ModelCard from '../components/ModelCard'
import { models } from '../data/models'
import { useAppStore } from '../store/useAppStore'
type ModelFilter = 'chat' | 'stt-tts' | 'embedding' | 'system' | 'search'
export const modelTabList: { key: ModelFilter; label: string; icon: string }[] = [
  { key: 'chat', label: '对话', icon: 'fa-solid fa-comments' },
  { key: 'stt-tts', label: '语音', icon: 'fa-solid fa-volume-high' },
  { key: 'embedding', label: '向量', icon: 'fa-solid fa-vector-square' },
  { key: 'system', label: '决策', icon: 'fa-solid fa-microchip' },
  { key: 'search', label: '搜索', icon: 'fa-solid fa-magnifying-glass' },
]
export default function ModelsPage() {
  const activeFilter = useAppStore((s) => s.modelsCategory) as ModelFilter
  const visibleModels = models.filter((m) => m.category === activeFilter)
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6">
        {visibleModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  )
}
