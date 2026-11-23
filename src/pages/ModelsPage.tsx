import { useState } from 'react'
import ModelCard from '../components/ModelCard'
import { models } from '../data/models'
/** 模型分类页签（对应 Model.category） */
type ModelFilter = 'chat' | 'stt-tts' | 'embedding' | 'system' | 'search'
/** 模型页签配置 */
const modelTabs: { key: ModelFilter; label: string; icon: string }[] = [
  { key: 'chat', label: '对话模型', icon: 'fa-solid fa-comments' },
  { key: 'stt-tts', label: '语音模型', icon: 'fa-solid fa-volume-high' },
  { key: 'embedding', label: '向量模型', icon: 'fa-solid fa-vector-square' },
  { key: 'system', label: '决策模型', icon: 'fa-solid fa-microchip' },
  { key: 'search', label: '搜索引擎', icon: 'fa-solid fa-magnifying-glass' },
]
/** 「模型」菜单页：分类页签 + 模型卡片网格（样式对照技能页，无助理药丸） */
export default function ModelsPage() {
  const [activeFilter, setActiveFilter] = useState<ModelFilter>('chat')
  const visibleModels = models.filter((m) => m.category === activeFilter)
  return (
    <div>
      {/* 分类页签 */}
      <div className="flex items-center gap-8 border-b">
        {modelTabs.map((tab) => {
          const active = tab.key === activeFilter
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 bg-transparent pb-3 font-medium text-[15px] outline-none transition-colors duration-150 ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className={`${tab.icon} text-sm`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
      {/* 模型卡片网格 */}
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {visibleModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  )
}
