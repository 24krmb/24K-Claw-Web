import type { Command } from '../types'
/* 24KClaw Sites 命令列表
用来快速调用 24K-Claw 的内置能力
*/
export const commands: Command[] = [
    {id: 'market-quotes',name: '/market-quotes',icon: 'fa-solid fa-chart-line',tone: 'blue',installed: false,description: '实时行情：A股/港股/美股指数与个股报价、盘口与涨跌排行'},
{id: 'stock-screen',name: '/stock-screen',icon: 'fa-solid fa-filter',tone: 'violet',installed: true,description: '条件选股：按估值、市值、技术形态、资金流向筛选标的'},
{id: 'backtest',name: '/backtest',icon: 'fa-solid fa-clock-rotate-left',tone: 'indigo',installed: true,description: '策略回测：运行历史数据回测，输出收益、回撤与胜率报告'},
{id: 'portfolio',name: '/portfolio',icon: 'fa-solid fa-wallet',tone: 'emerald',installed: true,description: '持仓分析：风险敞口、行业分布与收益归因'},
{id: 'fund-flow',name: '/fund-flow',icon: 'fa-solid fa-money-bill-transfer',tone: 'teal',installed: true,description: '资金监控：板块与个股资金流向、主力动向追踪'},
{id: 'news-sentiment',name: '/news-sentiment',icon: 'fa-solid fa-newspaper',tone: 'sky',installed: false,description: '资讯情绪：财经新闻抓取、事件提炼与市场情绪分析'},
{id: 'macro-data',name: '/macro-data',icon: 'fa-solid fa-earth-asia',tone: 'orange',installed: false,description: '宏观查询：GDP、CPI、PMI、社融等宏观经济指标检索'},
{id: 'risk-alert',name: '/risk-alert',icon: 'fa-solid fa-shield-halved',tone: 'red',installed: true,description: '风险预警：异常波动、龙虎榜与风险事件实时提醒'},
{id: 'valuation',name: '/valuation',icon: 'fa-solid fa-percent',tone: 'amber',installed: false,description: '估值分析：PE/PB/PS 估值分位、行业对比与历史区间'},
{id: 'technical-analysis',name: '/technical-analysis',icon: 'fa-solid fa-chart-column',tone: 'cyan',installed: false,description: '技术分析：K线形态、均线系统与常用技术指标研判'},
{id: 'finance-calendar',name: '/finance-calendar',icon: 'fa-solid fa-calendar-days',tone: 'slate',installed: false,description: '财经日历：财报披露、经济数据发布与重要事件时间表'},
{id: 'site-badge',name: '/site-badge',icon: 'fa-solid fa-certificate',tone: 'blue',installed: false,description: 'Hide or show the 24KClaw badge on the linked 24KClaw Sites site.'},
{id: 'site-deploy',name: '/site-deploy',icon: 'fa-solid fa-rocket',tone: 'emerald',installed: true,description: 'Deploy this project to 24KClaw Sites, or redeploy the linked site.'},
{id: 'site-logs',name: '/site-logs',icon: 'fa-solid fa-scroll',tone: 'slate',installed: false,description: 'Show the logs of a 24KClaw Sites deployment and explain any failure.'},
{id: 'site-offline',name: '/site-offline',icon: 'fa-solid fa-power-off',tone: 'rose',installed: false,description: 'Take the linked 24KClaw Sites site offline.'},
{id: 'site-online',name: '/site-online',icon: 'fa-solid fa-circle-play',tone: 'teal',installed: false,description: 'Bring the linked 24KClaw Sites site back online.'},
{id: 'site-status',name: '/site-status',icon: 'fa-solid fa-circle-info',tone: 'sky',installed: false,description: 'Show the 24KClaw Sites site linked to this project.'},
{id: 'site-usage',name: '/site-usage',icon: 'fa-solid fa-chart-simple',tone: 'amber',installed: false,description: 'Show 24KClaw Sites usage and plan limits.'},
]
