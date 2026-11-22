import type { Subagent } from '../types'

/**
 * 「子 Agent」菜单页的子代理数据（mock）
 * 分类体系：general 通用 / research 研究 / data 数据 / quant 量化 / news 资讯 / risk 风控（金融市场）
 */
export const subagents: Subagent[] = [
  {
    id: 'general-purpose',
    name: '通用子智能体',
    slug: 'general-purpose',
    category: 'general',
    installed: true,
    description:
      '通用子 agent，用于复杂、多步骤、上下文独立的任务。当工作会让主线程被工具输出塞满时，或者并行委托有帮助时使用。继承主 agent 的工具与权限配置。',
  },
  {
    id: 'report-parser',
    name: '财报解析器',
    slug: 'report-parser',
    category: 'data',
    installed: true,
    description:
      '拉取并解析上市公司定期报告与公告 PDF，抽取营收、利润、现金流等关键科目，输出结构化财务指标时序表供基本面分析使用。',
  },
  {
    id: 'market-data',
    name: '行情采集器',
    slug: 'market-data',
    category: 'data',
    installed: false,
    description:
      '多源实时行情与历史 K 线采集，统一时间对齐与复权处理，落库并做日级增量校验，为技术分析与量化计算提供数据底座。',
  },
  {
    id: 'backtest-runner',
    name: '回测执行器',
    slug: 'backtest-runner',
    category: 'quant',
    installed: true,
    description:
      '接收策略参数驱动回测引擎跑批，输出收益曲线、最大回撤、年化与夏普等绩效指标及逐笔交易明细，支撑问策的回测报告。',
  },
  {
    id: 'factor-miner',
    name: '因子挖掘器',
    slug: 'factor-miner',
    category: 'quant',
    installed: false,
    description:
      '批量构建候选 Alpha 因子并做标准化预处理，输出 IC 序列、分层收益与衰减曲线报告，供见微做统计显著性复核。',
  },
  {
    id: 'strategy-translator',
    name: '策略转换器',
    slug: 'strategy-translator',
    category: 'quant',
    installed: false,
    description:
      '把研究 notebook 中的策略逻辑转换为统一信号接口的生产代码，对齐 Quant Developer 的工程规范并生成回测对照。',
  },
  {
    id: 'news-sentiment',
    name: '新闻情绪分析师',
    slug: 'news-sentiment',
    category: 'news',
    installed: false,
    description:
      '实时摘要财经新闻并打情绪分，聚类关联事件与标的，输出事件影响评级，为 Sentiment Analyst 提供持续的输入流。',
  },
  {
    id: 'announcement-monitor',
    name: '公告监控器',
    slug: 'announcement-monitor',
    category: 'news',
    installed: false,
    description:
      '监控交易所公告与公司公告的关键词规则，分钟级识别重大事项（减持、业绩预告、问询函）并推送告警卡片。',
  },
  {
    id: 'risk-sentinel',
    name: '风险哨兵',
    slug: 'risk-sentinel',
    category: 'risk',
    installed: false,
    description:
      '持续跟踪组合波动率、回撤与持仓相关性变化，触发阈值时向风险管理团队与 Risk Manager 推送告警和建议动作。',
  },
  {
    id: 'exposure-analyzer',
    name: '暴露分析器',
    slug: 'exposure-analyzer',
    category: 'risk',
    installed: false,
    description:
      '分解组合的行业、风格与因子暴露，识别集中度与隐性杠杆风险，输出压力情景下的损失估算供风控复盘。',
  },
]
