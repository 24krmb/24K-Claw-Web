import type { Model } from '../types'

/**
 * 「模型」菜单页的模型数据（mock，来源 Develop/models.md）
 * 分类：chat 对话模型 / stt-tts 语音 / embedding 向量 / system System One / search 搜索
 * LOGO 在 public/images/models；无 LOGO 的模型用 FA 图标色块展示
 */
export const models: Model[] = [
// ── Chat Models（18 条）──
{id: 'kimi-k3',name: 'Kimi K3',logo: '/images/models/kimi.svg',category: 'chat',enabled: true},
{id: 'kimi-k2-7-code',name: 'Kimi K2.7-Code',logo: '/images/models/kimi.svg',category: 'chat',enabled: true},
{id: 'glm-5-3-flash',name: 'GLM-5.3-Flash',logo: '/images/models/zai.svg',category: 'chat',enabled: true},
{id: 'glm-5-3',name: 'GLM-5.3',logo: '/images/models/zai.svg',category: 'chat',enabled: true},
{id: 'qwen3-8-max',name: 'Qwen3.8-Max',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
{id: 'qwen3-8-flash',name: 'Qwen3.8-Flash',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
{id: 'minimax-m2-5',name: 'MiniMax-M2.5',logo: '/images/models/minimax.svg',category: 'chat',enabled: true},
{id: 'deepseek-v4-1-flash',name: 'Deepseek-V4.1-Flash',logo: '/images/models/deepseek.svg',category: 'chat',enabled: true},
{id: 'deepseek-v4-pro',name: 'Deepseek-V4-Pro',logo: '/images/models/deepseek.svg',category: 'chat',enabled: true},
{id: 'happyhorse-1-1-r2v',name: 'HappyHorse-1.1-r2v',logo: '/images/models/happyhorse.svg',category: 'chat',enabled: true},
{id: 'happyhorse-1-1-t2v',name: 'HappyHorse-1.1-t2v',logo: '/images/models/happyhorse.svg',category: 'chat',enabled: true},
{id: 'happyhorse-1-1-i2v',name: 'HappyHorse-1.1-i2v',logo: '/images/models/happyhorse.svg',category: 'chat',enabled: true},
{id: 'qwen-image-3-0-pro',name: 'Qwen-Image-3.0-Pro',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
{id: 'wan2-7-image',name: 'Wan2.7-Image',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
{id: 'wan2-7-image-pro',name: 'Wan2.7-Image-Pro',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
{id: 'qwen3-7-max',name: 'Qwen3.7-Max',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
{id: 'qwen3-7-plus',name: 'Qwen3.7-Plus',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
{id: 'qwen-audio-3-0-asr-flash',name: 'Qwen-Audio-3.0-asr-Flash',logo: '/images/models/qwen.svg',category: 'chat',enabled: true},
// ── STT / TTS（8 条）──
{id: 'browser-native-stt',name: 'Browser Native',icon: 'fa-solid fa-microphone-lines',tone: 'sky',category: 'stt-tts',enabled: true},
{id: 'edge-tts',name: 'Edge TTS',icon: 'fa-brands fa-edge',tone: 'sky',category: 'stt-tts',enabled: true},
{id: 'browser-native-tts',name: 'Browser Native',icon: 'fa-solid fa-volume-high',tone: 'cyan',category: 'stt-tts',enabled: true},
{id: 'xiaomi-mimo-stt',name: 'Xiaomi MiMo STT',icon: 'fa-solid fa-microphone-lines',tone: 'rose',category: 'stt-tts',enabled: true},
{id: 'xiaomi-mimo-tts',name: 'Xiaomi MiMo TTS',icon: 'fa-solid fa-volume-high',tone: 'rose',category: 'stt-tts',enabled: true},
{id: 'openai-tts',name: 'OpenAI TTS',icon: 'fa-solid fa-volume-high',tone: 'slate',category: 'stt-tts',enabled: true},
{id: 'tencent-asr-tts',name: 'Tencent ASR + TTS',icon: 'fa-solid fa-wave-square',tone: 'blue',category: 'stt-tts',enabled: true},
{id: 'qwen-asr-tts',name: 'Qwen ASR + TTS',logo: '/images/models/qwen.svg',category: 'stt-tts',enabled: true},
// ── Embedding（12 条）──
{id: 'bge-small-zh',name: 'bge-small-zh',icon: 'fa-solid fa-vector-square',tone: 'slate',category: 'embedding',enabled: true},
{id: 'bge-small-en',name: 'bge-small-en',icon: 'fa-solid fa-vector-square',tone: 'slate',category: 'embedding',enabled: true},
{id: 'bge-base-en',name: 'bge-base-en',icon: 'fa-solid fa-vector-square',tone: 'slate',category: 'embedding',enabled: true},
{id: 'gte-base',name: 'gte-base',icon: 'fa-solid fa-vector-square',tone: 'violet',category: 'embedding',enabled: true},
{id: 'gte-large',name: 'gte-large',icon: 'fa-solid fa-vector-square',tone: 'violet',category: 'embedding',enabled: true},
{id: 'bge-large-en',name: 'bge-large-en',icon: 'fa-solid fa-vector-square',tone: 'slate',category: 'embedding',enabled: true},
{id: 'all-minilm-l6-v2',name: 'all-MiniLM-L6-v2',icon: 'fa-solid fa-vector-square',tone: 'sky',category: 'embedding',enabled: true},
{id: 'multilingual-minilm-l',name: 'multilingual-MiniLM-L',icon: 'fa-solid fa-vector-square',tone: 'sky',category: 'embedding',enabled: true},
{id: 'multilingual-e5-large',name: 'multilingual-e5-large',icon: 'fa-solid fa-vector-square',tone: 'sky',category: 'embedding',enabled: true},
{id: 'jina-embeddings-v2-base-zh',name: 'jina-embeddings-v2-base-zh',icon: 'fa-solid fa-vector-square',tone: 'violet',category: 'embedding',enabled: true},
{id: 'jina-embeddings-v2-base-en',name: 'jina-embeddings-v2-base-en',icon: 'fa-solid fa-vector-square',tone: 'violet',category: 'embedding',enabled: true},
{id: 'jina-embeddings-v2-small-en',name: 'jina-embeddings-v2-small-en',icon: 'fa-solid fa-vector-square',tone: 'violet',category: 'embedding',enabled: true},
// ── System One（3 条）──
{id: 'jev',name: 'Jev',logo: '/images/models/jev.webp',category: 'system',enabled: true},
{id: 'laya',name: 'Laya',logo: '/images/models/laya.webp',category: 'system',enabled: true},
{id: 'microsoft-decision',name: 'Microsoft Decision',logo: '/images/models/Microsoft.png',category: 'system',enabled: true},
// ── Search（4 条）──
{id: 'tavily',name: 'Tavily',logo: '/images/models/tavily.svg',category: 'search',enabled: true},
{id: 'brave-search',name: 'Brave Search',icon: 'fa-brands fa-brave',tone: 'orange',category: 'search',enabled: true},
{id: 'google-search',name: 'Google Search',logo: '/images/models/google.svg',category: 'search',enabled: true},
{id: 'kimi-moonshot',name: 'Kimi (Moonshot)',logo: '/images/models/kimi.svg',category: 'search',enabled: true}
]
