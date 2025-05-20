import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Settings, ShoppingCart, StickyNote } from 'lucide-react'
import Link from 'next/link'

export default function QuickActionsPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/task" className="cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 w-full flex flex-col items-center justify-center cursor-pointer"
            >
              <Plus className="h-5 w-5 text-primary mb-2" />
              <span>Nova Tarefa</span>
            </Button>
          </Link>

          <Link href="/shopping" className="cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 w-full flex flex-col items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5 text-primary mb-2" />
              <span>Nova Compra</span>
            </Button>
          </Link>

          <Link href="/note" className="cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 w-full flex flex-col items-center justify-center cursor-pointer"
            >
              <StickyNote className="h-5 w-5 text-primary mb-2" />
              <span>Nova Nota</span>
            </Button>
          </Link>
          <Link href="/profile" className="cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 w-full flex flex-col items-center justify-center cursor-pointer"
            >
              <Settings className="h-5 w-5 text-primary mb-2" />
              <span>Configurações</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
