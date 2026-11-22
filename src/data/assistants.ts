import type { Assistant } from '../types'

/**
 * 「我的助理」标签页下的助理列表数据（mock）
 */
export const myAssistants: Assistant[] = [
  {
    id: 'Goal',
    name: 'Goal',
    avatar: '/images/avatars/goal.png',
    running: true,
    description:'在汇总分析师团队与研究团队意见后，结合量化数据与情感信息等多维输入，做出具体买卖决策',
  },
  
  {
    id: 'Fundamental Analyst',
    name: 'Fundamental Analyst',
    avatar: '/images/avatars/2.png',
    running: true,
    description:'通过分析财报、收益报告、内部交易等数据来评估公司内在价值，判断是否被低估或高估。',
  },
  {
    id: 'News Analyst',
    name: 'News Analyst',
    avatar: '/images/avatars/4.png',
    running: false,
    description:
      '追踪宏观经济指标、重大新闻及公司事件，识别对市场有潜在影响的突发消息或政策变化。',
  },
  {
    id: 'Technical Analyst',
    name: 'Technical Analyst',
    avatar: '/images/avatars/5.png',
    running: true,
    description:'计算MACD、RSI等技术指标，分析价量关系和价格形态，用于判断买卖时机和趋势走势。',
  },
  
  {
    id: 'Bullish Researchers',
    name: 'Bullish Researchers',
    avatar: '/images/avatars/9.png',
    running: true,
    description:'多头研究员，强调积极面与增长空间，为看多策略提供支撑性论据。',
  },
  {
    id: 'Bearish Researchers',
    name: 'Bearish Researchers',
    avatar: '/images/avatars/10.png',
    running: true,
    description:'空头研究员。着重揭示潜在风险与消极信号，为避免盲目入场提供“对立”观点。',
  },
  {
    id: 'risk-manager',
    name: 'Risk Manager',
    avatar: '/images/avatars/7.png',
    running: true,
    description:'按风控规则执行对冲、减仓、止损指令与情景压力测试，守住组合的风险底线。',
  },
  {
    id: 'quant-developer',
    name: 'Quant Developer',
    avatar: '/images/avatars/8.png',
    running: true,
    description:'量化开发工程师，负责策略代码实现、因子计算与行情数据管道，把研究想法落地为可回测、可上线的量化系统。',
  },
  {
    id: 'wen-ce',
    name: '问策',
    avatar: '/images/avatars/4.png',
    running: true,
    description: '策略是否可行，回测见真章。A股/期货、量化策略编写、回测引擎执行与专业回测报告。',
  },
  {
    id: 'karpathy-wiki-expert',
    name: '卡帕西',
    avatar: '/images/avatars/3.png',
    running: false,
    description:'基于 Karpathy LLM Wiki 思路维护知识库，并让知识随每次摄取与研究不断积累。',
  },
  {
    id: 'ai-coding-mentor',
    name: 'AI 编程实战导师',
    avatar: '/images/avatars/6.png',
    running: false,
    description:'源自 ai-coding-guide 的 66 个 Claude Code 技巧与 9+ 款工具最佳实践，教你如何用出生产力：上下文管理、任务分解、提示词工程与代码评审流程。',
  },
  {
    id: 'Sentiment Analyst',
    name: 'Sentiment Analyst',
    avatar: '/images/avatars/3.png',
    running: false,
    description:'关注社交媒体、舆情打分以及公司内部情绪等公众信息，预测短期投资者行为可能对股价带来的影响。',
  },
  {
    id: 'jian-wei',
    name: '见微',
    avatar: '/images/avatars/9.png',
    running: false,
    description:'见微知著，万法归一。掌握 82 种统计方法与 37 种统计检验，覆盖统计方法选择、高级建模、标准化分析流程、检验验证与科学绘图全链路。',
  },
  {
    id: 'su-wei',
    name: '溯薇',
    avatar: '/images/avatars/13.png',
    running: false,
    description:'溯流而上，采薇而得。学术论文检索的溯源者。批量 PDF 下载与元数据提取，高级检索自动化，引文规范管理与文献智能监测。',
  },
]
