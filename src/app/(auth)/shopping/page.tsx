'use client'

import PageHeader from '@/components/header'
import { useState } from 'react'
import { CShopping } from './components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

export default function Shopping() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [showPurchased, setShowPurchased] = useState<boolean>(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <div className="flex-1 flex flex-col dark:bg-sidebar">
      <PageHeader
        title="Lista de Compras"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSearch={setSearchTerm}
        searchValue={searchTerm}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 dark:bg-sidebar">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <CShopping.selectCategories value={categoryFilter} onValueChange={setCategoryFilter} />
            <CShopping.checkbox checked={showPurchased} onCheckedChange={setShowPurchased} />
          </div>
        </div>
        <CShopping.new />
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between ">
            <div>
              <CardTitle>Lista de Compras</CardTitle>
              <CardDescription className="text-sm text-foreground-light">
                {showPurchased ? 'Itens comprados' : 'Itens a comprar'}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground-light hover:text-foreground cursor-pointer"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Compartilhar
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <CShopping.shoppingViewList
                name={searchTerm}
                category={categoryFilter}
                purchased={showPurchased}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
