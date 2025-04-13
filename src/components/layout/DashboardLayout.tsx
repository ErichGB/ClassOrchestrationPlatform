import { Outlet } from "react-router"
import { Sidebar } from "./Sidebar"

export function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  )
} 