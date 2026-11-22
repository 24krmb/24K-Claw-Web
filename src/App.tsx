import { Navigate, Route, Routes } from 'react-router-dom'
import WorkspacePage from './pages/WorkspacePage'
import { defaultTabKey } from './data/tabs'

/** 路由入口：/ 重定向到默认标签页；标签页 /agents/:tabKey；菜单页按层级 /:menuKey、/:groupKey/:menuKey */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/agents/${defaultTabKey}`} replace />} />
      <Route path="/agents/:tabKey" element={<WorkspacePage />} />
      <Route path="/:menuKey" element={<WorkspacePage />} />
      <Route path="/:groupKey/:menuKey" element={<WorkspacePage />} />
      <Route path="*" element={<Navigate to={`/agents/${defaultTabKey}`} replace />} />
    </Routes>
  )
}
