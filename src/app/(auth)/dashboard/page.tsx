'use client'
import PageHeader from '@/components/header'
import { useState } from 'react'
import { CDashboard } from './components'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className="flex-1 flex flex-col bg-sidebar dark:bg-sidebar-dark">
      <PageHeader title="Dashboard" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main className="flex-1 overflow-auto p-4 md:p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <CDashboard.dashboardCards />
        </div>
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CDashboard.recentActivitiesPanel />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CDashboard.quickActionsPanel />
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Próximas Tarefas</CardTitle>
            </CardHeader>
            <CardContent>
              <CDashboard.upcomintTaskPanel />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
