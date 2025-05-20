'use client'
import PageHeader from '@/components/header'
import { useState } from 'react'
import { CProfile } from './components'

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <div className="flex flex-col flex-1 w-full dark:bg-sidebar">
      <PageHeader title="Perfil de Usuário" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="p-6 flex-1">
        <div className="max-w-md mx-auto">
          <CProfile.profile />
        </div>
      </div>
    </div>
  )
}
