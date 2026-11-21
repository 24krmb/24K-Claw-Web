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
    avatarGradient: 'from-amber-400 to-orange-500',
    avatarText: 'Q',
  },
  {
    id: 'ai-coding-mentor',
    name: 'AI 编程实战导师',
    description:
      '源自 ai-coding-guide 的 66 个 Claude Code 技巧与 9+ 款工具最佳实践，教你如何用出生产力：上下文管理、任务分解、提示词工程与代码评审流程。',
    avatarGradient: 'from-rose-400 to-pink-600',
    avatarText: '编',
  },
  {
    id: 'karpathy-wiki-expert',
    name: '卡帕西知识库专家',
    description:
      '基于 Karpathy LLM Wiki 思路维护本地 Markdown 知识库：原始资料保持不变，AI 持续编译相互链接的 Wiki，并通过 MEMORY.md 维护长期记忆。',
    avatarGradient: 'from-sky-400 to-indigo-500',
    avatarText: '知',
  },
]
