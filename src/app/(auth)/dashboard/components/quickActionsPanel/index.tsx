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
          <Link href="/tasks">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 w-full flex flex-col items-center justify-center"
            >
              <Plus className="h-5 w-5 text-primary mb-2" />
              <span>Nova Tarefa</span>
            </Button>
          </Link>

          <Link href="/shopping">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 w-full flex flex-col items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 text-secondary mb-2" />
              <span>Nova Compra</span>
            </Button>
          </Link>

          <Link href="/notes">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 w-full flex flex-col items-center justify-center"
            >
              <StickyNote className="h-5 w-5 text-accent mb-2" />
              <span>Nova Nota</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="h-auto py-4 w-full flex flex-col items-center justify-center"
          >
            <Settings className="h-5 w-5 text-foreground-light mb-2" />
            <span>Configurações</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
