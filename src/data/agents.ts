import type { AgentTemplate } from '../types'

/**
 * 「内置 Agent」标签页下的 Agent 模板卡片数据
 */
export const agentTemplates: AgentTemplate[] = [
  {
    id: 'qa-agent',
    name: 'QA Agent',
    description:
      '内置的 QA Agent。帮助用户理解、配置与日常使用，帮助用户定位问题，寻找答案，给出解决方法。',
    avatar: '/images/avatars/1.png',
  },
  {
    id: 'Goal',
    name: 'Goal',
    description:
      '在汇总分析师团队与研究团队意见后，结合量化数据与情感信息等多维输入，做出具体买卖决策',
    avatar: '/images/avatars/8.png',
  },
  {
    id: 'Fundamental Analyst',
    name: 'Fundamental Analyst',
    description:
      '通过分析财报、收益报告、内部交易等数据来评估公司内在价值，判断是否被低估或高估，为投资提供参考。',
    avatar: '/images/avatars/2.png',
  },
  {
    id: 'Sentiment Analyst',
    name: 'Sentiment Analyst',
    description:
      '关注社交媒体、舆情打分以及公司内部情绪等公众信息，预测短期投资者行为可能对股价带来的影响。',
    avatar: '/images/avatars/3.png',
  },
  {
    id: 'News Analyst',
    name: 'News Analyst',
    description:
      '追踪宏观经济指标、重大新闻及公司事件，识别对市场有潜在影响的突发消息或政策变化，为把握行情拐点提供依据。',
    avatar: '/images/avatars/4.png',
  },
  {
    id: 'Technical Analyst',
    name: 'Technical Analyst',
    description:
      '计算MACD、RSI等技术指标，分析价量关系和价格形态，用于判断买卖时机和趋势走势。',
    avatar: '/images/avatars/5.png',
  },
  {
    id: 'ai-coding-mentor',
    name: 'AI 编程实战导师',
    description:
      '源自 ai-coding-guide 的 66 个 Claude Code 技巧与 9+ 款工具最佳实践，教你如何用出生产力：上下文管理、任务分解、提示词工程与代码评审流程。',
    avatar: '/images/avatars/6.png',
  },
  {
    id: 'karpathy-wiki-expert',
    name: '卡帕西',
    description:
      '基于 Karpathy LLM Wiki 思路维护本地 Markdown 知识库：原始资料保持不变，AI 持续编译相互链接的 Wiki，并通过 MEMORY.md 维护长期记忆。',
    avatar: '/images/avatars/7.png',
  },
  
  {
    id: 'Bullish Researchers',
    name: 'Bullish Researchers',
    description:
      '多头研究员，强调积极面与增长空间，为看多策略提供支撑性论据。',
    avatar: '/images/avatars/9.png',
  },
  {
    id: 'Bearish Researchers',
    name: 'Bearish Researchers',
    description:
      '空头研究员。着重揭示潜在风险与消极信号，为避免盲目入场提供“对立”观点。',
    avatar: '/images/avatars/10.png',
  },
  {
    id: 'wen-ce',
    name: '问策',
    avatar: '/images/avatars/4.png',
    description: '策略是否可行，回测见真章。A股/期货、量化策略编写、回测引擎执行与专业回测报告。',
  },
  {
    id: 'jian-wei',
    name: '见微',
    avatar: '/images/avatars/9.png',
    description:
      '见微知著，万法归一。掌握 82 种统计方法与 37 种统计检验，覆盖统计方法选择、高级建模、标准化分析流程、检验验证与科学绘图全链路。',
  },
  {
    id: 'su-wei',
    name: '溯薇',
    avatar: '/images/avatars/13.png',
    description:
      '溯流而上，采薇而得。学术论文检索的溯源者。批量 PDF 下载与元数据提取，高级检索自动化，引文规范管理与文献智能监测。',
  },
]
