import type { AcpRunner } from '../types'

/** ACP Runner 列表（对应参考稿外部编程助理，默认全部禁用；前 5 个顺序与参考稿一致） */
export const acpRunners: AcpRunner[] = [
  { id: 'opencode', name: 'OpenCode', icon: 'fa-solid fa-terminal', tone: 'black', logo: '/images/acp/opencode.webp', enabled: true, description: 'SST 开源的终端 AI 编程助理，原生支持 ACP 协议，以 opencode acp 启动后即可通过 stdio 与 24K-Claw 协作。' },
  { id: 'codex', name: 'Codex', icon: 'fa-solid fa-microchip', tone: 'black', logo: '/images/acp/codex.svg', enabled: false, description: 'OpenAI Codex CLI 编码智能体，通过 codex-acp 桥接器接入 ACP，可执行代码编写、重构与终端自动化任务。' },
  { id: 'kimi-code', name: 'Kimi Code', icon: 'fa-solid fa-moon', tone: 'black', logo: '/images/acp/kimi.svg', enabled: false, description: '月之暗面 Kimi Code CLI，先执行 kimi login 登录账号，再以 kimi acp 命令启动接入 ACP。' },
  { id: 'cursor-cli', name: 'Cursor CLI', icon: 'fa-solid fa-cube', tone: 'black', logo: '/images/acp/cursor.svg', enabled: false, description: 'Cursor 官方 CLI 编程智能体，需先 agent login 或设置 CURSOR_API_KEY，再以 agent acp 启动接入。' },
  { id: 'pi', name: 'Pi', icon: 'fa-solid fa-plug', tone: 'black', logo: '/images/acp/pi.webp', enabled: false, description: '轻量终端编程助理，通过 pi-acp 桥接器接入 ACP，使用 npx -y pi-acp 即可运行，无需额外配置。' },
  { id: 'codebuddy', name: 'CodeBuddy', icon: 'fa-solid fa-code', tone: 'sky', logo: '/images/acp/codebuddy.svg', enabled: false, description: '腾讯云 AI 编程助手 CodeBuddy Code，内置 ACP 支持，使用 codebuddy --acp 命令启动，国内网络环境直连可用。' },
  { id: 'claude-code', name: 'Claude Code', icon: 'fa-solid fa-asterisk', tone: 'black', logo: '/images/acp/claudecode.svg', enabled: false, description: 'Anthropic 官方终端编程助手，借助 claude-code-acp 适配器接入 ACP，擅长多文件重构、测试与工程级任务。' },
  { id: 'qoder', name: 'Qoder', icon: 'fa-solid fa-robot', tone: 'orange', logo: '/images/acp/qoder.svg', enabled: false, description: '阿里旗下编程智能体，需设置 QODERCN_PERSONAL_ACCESS_TOKEN 环境变量。' },
]
