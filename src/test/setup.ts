import '@testing-library/jest-dom/vitest'

// Font Awesome 图标在 jsdom 中不加载 CSS，仅验证 <i> 元素存在即可，无需处理

// jsdom 未实现 matchMedia（WorkspacePage 抽屉断点检测用到），补最小桩实现
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}
