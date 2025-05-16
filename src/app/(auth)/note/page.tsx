'use client'
import PageHeader from '@/components/header'
import { useState } from 'react'
import { CNote } from './components'
import NoteService from '@/service/note'
import { useQuery } from '@tanstack/react-query'

export default function Note() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'kanban'>('grid')

  const { data } = useQuery({
    queryKey: ['notes'],
    queryFn: NoteService.get
  })

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Notas"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSearch={setSearchTerm}
        searchValue={searchTerm}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <CNote.viewModeToggle value={viewMode} onChange={setViewMode} />
          </div>

          <div className="flex space-x-2">
            <CNote.exportNote />
            <CNote.newNote />
          </div>
        </div>
        <CNote.noteViewContainer viewMode={viewMode} data={data} />
      </main>
    </div>
  )
}
