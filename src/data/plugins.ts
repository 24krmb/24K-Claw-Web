import type { Plugin } from '../types'

/**
 * 「插件」菜单页数据
 * 状态：enabled 为 true 时徽章显示「已加载」且开关为开启态
 */
export const plugins: Plugin[] = [
{id: 'kline',name: 'K 线走势分析',icon: 'fa-solid fa-chart-line',tone: 'emerald',category: '金融',version: 'v0.1.0',enabled: false,description: '展示 K 线面板，支持指数/板块/期货。'},
{id: 'concept-ranking',name: '热点概念排行榜',icon: 'fa-solid fa-ranking-star',tone: 'rose',category: '金融',version: 'v0.1.0',enabled: false,description: '在聊天界面展示热点概念 TOP10。'},
{id: 'money-flow',name: '资金流向',icon: 'fa-solid fa-money-bill-trend-up',tone: 'emerald',category: '金融',version: 'v0.1.0',enabled: true,description: '展示资金流向，支持指数/板块/期货。'},
{id: 'index-trend',name: '指数/板块/期货',icon: 'fa-solid fa-chart-area',tone: 'sky',category: '金融',version: 'v0.1.0',enabled: false,description: '展示指数/板块/期货的走势图。'},
{id: 'industry-ranking',name: '行业板块排行榜',icon: 'fa-solid fa-list-ol',tone: 'amber',category: '金融',version: 'v0.1.0',enabled: false,description: '在聊天界面展示行业板块 TOP10。'},
{id: 'industry-spread',name: '产业链价差',icon: 'fa-solid fa-scale-balanced',tone: 'violet',category: '金融',version: 'v0.1.0',enabled: false,description: '展示大宗商品比值金银比、螺矿比等。'},
{id: 'position-analysis',name: '持仓语言',icon: 'fa-solid fa-clipboard-list',tone: 'slate',category: '金融',version: 'v0.1.0',enabled: true,description: '商品期货最近收盘时的持仓分析。'},
{id: 'hot-list',name: '热榜',icon: 'fa-solid fa-fire',tone: 'amber',category: '资讯',version: 'v0.2.2',enabled: false,description: '在聊天中展示 10 大财经网站热点。'},
{id: 'server-status',name: '服务器状态',icon: 'fa-solid fa-server',tone: 'slate',category: '运维',version: 'v0.2.2',enabled: false,description: '在聊天中展示当前服务器的操作系统、内核与 CPU / 内存 / 磁盘负载。'},
{id: 'wiki-summary',name: '维基摘要',icon: 'fa-solid fa-w',tone: 'sky',category: '工具',version: 'v0.1.0',enabled: false,description: '读取 Wikipedia 条目摘要。'},
]
