'use client'
import Sidebar from '@/components/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { ReactNode, useState } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(useIsMobile())

  return (
    <div className={`min-h-screen flex flex-col md:flex-row`}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
