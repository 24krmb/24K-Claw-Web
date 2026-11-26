import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ErrorBoundary from '../components/ErrorBoundary'

/** ErrorBoundary 冒烟测试：正常子树透传渲染；异常子树渲染降级界面而非白屏 */
describe('ErrorBoundary', () => {
  it('子组件正常时直接渲染', () => {
    render(
      <ErrorBoundary>
        <div>正常内容</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText('正常内容')).toBeInTheDocument()
  })

  it('子组件抛错时渲染降级界面与错误信息', () => {
    // 捕获测试期间的 console.error 噪音
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    function Bomb(): never {
      throw new Error('测试爆炸')
    }
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )
    expect(screen.getByText('页面出了点问题')).toBeInTheDocument()
    expect(screen.getByText('测试爆炸')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '刷新页面' })).toBeInTheDocument()
    spy.mockRestore()
  })
})
