import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'

/** 应用冒烟测试：核心路由渲染出不崩溃，侧边栏与主内容挂载成功（页面为 React.lazy 懒加载，用 findBy 等待 chunk 加载） */
describe('App 冒烟测试', () => {
  function renderAt(path: string) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    )
  }

  it('/agents/mine（默认页）渲染侧边栏与主 Agent 卡片区', async () => {
    renderAt('/agents/mine')
    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { level: 1, name: '助理' })).toBeInTheDocument()
  })

  it('/ability/skills 渲染技能页', async () => {
    renderAt('/ability/skills')
    expect(
      await screen.findByRole('heading', { level: 1, name: '为不同的Agent配置不同的技能' }),
    ).toBeInTheDocument()
  })

  it('/subagents 渲染子 Agent 页', async () => {
    renderAt('/subagents')
    expect(
      await screen.findByRole('heading', { level: 1, name: '为不同的 Agent 配置 Subagent' }),
    ).toBeInTheDocument()
  })

  it('非法路由重定向到默认页', async () => {
    renderAt('/not-exist-menu')
    expect(await screen.findByRole('heading', { level: 1, name: '助理' })).toBeInTheDocument()
  })

  it('分组深链接重定向到第一个子项（/ability → /ability/skills）', async () => {
    renderAt('/ability')
    expect(
      await screen.findByRole('heading', { level: 1, name: '为不同的Agent配置不同的技能' }),
    ).toBeInTheDocument()
  })

  it('裸一级路由重定向到配置路由（/team → /agents/team）', async () => {
    renderAt('/team')
    expect(await screen.findByRole('heading', { level: 1, name: '团队' })).toBeInTheDocument()
  })
})
