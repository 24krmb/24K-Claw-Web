import type { Assistant } from '../types'

/**
 * 「我的助理」标签页下的助理列表数据（mock）
 */
export const myAssistants: Assistant[] = [
  {
    id: 'wen-ce',
    assistantId: 'A5T8Q3',
    name: '问策',
    avatar: '/images/avatars/4.png',
    running: true,
    description: '策略是否可行，回测见真章。A股/期货、量化策略编写、回测引擎执行与专业回测报告。',
  },
  {
    id: 'jian-wei',
    assistantId: 'D2N6W8',
    name: '见微',
    avatar: '/images/avatars/9.png',
    running: true,
    description:
      '见微知著，万法归一。掌握 82 种统计方法与 37 种统计检验，覆盖统计方法选择、高级建模、标准化分析流程、检验验证与科学绘图全链路。',
  },
  {
    id: 'karpathy-wiki-expert',
    assistantId: 'E4H7J1',
    name: '卡帕西',
    avatar: '/images/avatars/3.png',
    running: true,
    description:
      '基于 Karpathy LLM Wiki 思路维护本地 Markdown 知识库，并通过热索引、完整目录和日志让知识随每次摄取与研究不断积累。',
  },
  {
    id: 'su-wei',
    assistantId: 'F9L3X5',
    name: '溯薇',
    avatar: '/images/avatars/13.png',
    running: true,
    description:
      '溯流而上，采薇而得。学术论文检索的溯源者。批量 PDF 下载与元数据提取，高级检索自动化，引文规范管理与文献智能监测。',
  },
]
