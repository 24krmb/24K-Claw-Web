/** 非「内置 Agent」标签页的占位内容 */
export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3 text-muted-foreground">
      <i className="fa-solid fa-box-open text-3xl" />
      <p className="text-sm">
        「{title}」页面建设中，敬请期待
      </p>
    </div>
  )
}
