'use client'

import PageHeader from '@/components/header'
import { ViewModeToggle } from '@/components/viewModeToggle'
import { useState } from 'react'
import { CTask } from './components'

export default function Task() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'kanban'>('list')

  return (
    <div className="flex-1 flex flex-col dark:bg-sidebar">
      <PageHeader
        title="Gerenciamento de Tarefas"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSearch={setSearchTerm}
        searchValue={searchTerm}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 dark:bg-sidebar">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <CTask.selectPriority value={priorityFilter} onValueChange={setPriorityFilter} />
            <CTask.checkbox checked={showCompleted} onCheckedChange={setShowCompleted} />
            <ViewModeToggle value={viewMode} onChange={setViewMode} className="mt-3 md:mt-0" />
          </div>
        </div>
        <CTask.newTask />
        <CTask.viewTask
          viewMode={viewMode}
          priorityFilter={priorityFilter}
          searchTerm={searchTerm}
          showCompleted={showCompleted}
        />
      </main>
    </div>
  )
}
