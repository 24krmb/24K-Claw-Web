import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  /** 正常渲染的子内容 */
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * 顶层错误边界：捕获子树运行时异常，渲染降级界面而不是白屏。
 * 开发环境下同时把异常打印到控制台方便定位。
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] 捕获到未处理异常：', error, info.componentStack)
  }

  render() {
    const { error } = this.state
    if (error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-center">
          <i className="fa-solid fa-triangle-exclamation text-4xl text-red-500" aria-hidden="true" />
          <h1 className="text-lg font-semibold text-foreground">页面出了点问题</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            应用运行时发生了未预期的错误。可以尝试刷新页面；若反复出现，请把以下错误信息反馈给开发者。
          </p>
          <pre className="max-w-md overflow-auto rounded-lg bg-muted p-3 text-left font-mono text-xs text-muted-foreground">
            {error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            刷新页面
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
