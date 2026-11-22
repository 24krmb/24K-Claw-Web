import type { Subagent } from '../types'

/**
 * 「子 Agent」菜单页的子代理数据（mock，样式对照设计稿）
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
    category: 'finance',
    installed: true,
    description:
      '拉取并解析上市公司财报 PDF，抽取营收、利润、现金流等关键科目，输出结构化数据供基本面分析师使用。',
  },
  {
    id: 'backtest-runner',
    name: '回测执行器',
    slug: 'backtest-runner',
    category: 'finance',
    installed: true,
    description:
      '接收策略参数驱动回测引擎跑批，输出收益曲线、最大回撤与逐笔交易明细，支撑问策的回测报告。',
  },
  {
    id: 'market-data',
    name: '行情采集器',
    slug: 'market-data',
    category: 'finance',
    installed: false,
    description:
      '多源实时行情与历史 K 线采集，统一时间对齐与复权处理，为技术分析与量化计算提供数据底座。',
  },
  {
    id: 'sentiment-crawler',
    name: '舆情抓取器',
    slug: 'sentiment-crawler',
    category: 'finance',
    installed: false,
    description:
      '社交媒体与新闻舆情抓取、打分与事件聚类去重，为情绪分析师提供持续的舆情输入流。',
  },
  {
    id: 'risk-monitor',
    name: '风险监控器',
    slug: 'risk-monitor',
    category: 'finance',
    installed: false,
    description:
      '持续跟踪持仓波动率、回撤与相关性变化，触发阈值时向风险管理团队推送告警与建议动作。',
  },
  {
    id: 'paper-search',
    name: '文献检索器',
    slug: 'paper-search',
    category: 'academic',
    installed: false,
    description:
      '按关键词与语义检索学术数据库，批量获取摘要与全文链接，辅助溯薇完成文献溯源与监测。',
  },
  {
    id: 'citation-checker',
    name: '引文校验器',
    slug: 'citation-checker',
    category: 'academic',
    installed: false,
    description:
      '校验引文格式与引用真实性，检测文献间的引用关系图谱，输出规范化引文列表。',
  },
  {
    id: 'stats-advisor',
    name: '统计顾问',
    slug: 'stats-advisor',
    category: 'academic',
    installed: false,
    description:
      '根据数据形态推荐统计方法与检验方案，复核建模假设前提，为见微提供方法选型依据。',
  },
  {
    id: 'code-reviewer',
    name: '代码评审员',
    slug: 'code-reviewer',
    category: 'engineering',
    installed: false,
    description:
      '对策略代码与工具实现进行静态评审，标记潜在缺陷、边界条件与性能隐患，输出修改建议。',
  },
  {
    id: 'test-runner',
    name: '测试执行器',
    slug: 'test-runner',
    category: 'engineering',
    installed: false,
    description:
      '运行单元测试与集成测试套件，汇总失败用例与堆栈信息，回归结果自动比对历史基线。',
  },
  {
    id: 'docs-writer',
    name: '文档生成器',
    slug: 'docs-writer',
    category: 'engineering',
    installed: false,
    description:
      '根据代码变更与使用示例生成、更新接口文档与使用指南，保持文档与实现同步。',
  },
  {
    id: 'sql-optimizer',
    name: 'SQL 优化器',
    slug: 'sql-optimizer',
    category: 'engineering',
    installed: false,
    description:
      '分析慢查询执行计划，推荐索引与改写方案，验证优化前后性能差异并生成报告。',
  },
]
