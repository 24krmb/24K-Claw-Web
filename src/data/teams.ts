import type { Team } from '../types'

/**
 * 「团队」标签页下的团队列表数据（mock）
 */
export const teams: Team[] = [
  {
    id: 'research-team',
    name: '研究团队',
    avatar: '/images/avatars/11.png',
    running: true,
    description:
      '主要负责对分析师团队提供的数据进行批判性评估，并以多空两个不同视角展开多轮辩论',
    members: ['/images/avatars/9.png', '/images/avatars/10.png'],
  },
  {
    id: 'analyst-team',
    name: '分析师团队',
    avatar: '/images/avatars/12.png',
    running: true,
    description:
      '从基本面、情绪、新闻与技术四个维度并行分析标的，为研究团队提供多维输入数据',
    members: ['/images/avatars/2.png', '/images/avatars/3.png', '/images/avatars/4.png', '/images/avatars/5.png'],
  },
  {
    id: 'strategy-team',
    name: '策略团队',
    avatar: '/images/avatars/14.png',
    running: false,
    description:
      '汇总研究团队结论与量化数据制定具体买卖决策，并通过回测引擎验证策略可行性',
    members: ['/images/avatars/goal.png', '/images/avatars/4.png'],
  },
]
