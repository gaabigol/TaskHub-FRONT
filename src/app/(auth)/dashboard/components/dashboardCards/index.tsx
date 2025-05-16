import DashboardService from '@/service/dashboard'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { CDashboard } from '..'
import { dateNow } from '@/common/util'
import { CheckSquare, ShoppingCart, StickyNote } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: DashboardService.get
  })

  if (isLoading) {
    return (
      <Fragment>
        <CDashboard.summarySkeleton />
        <CDashboard.summarySkeleton />
        <CDashboard.summarySkeleton />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <CDashboard.card
        title="Tarefas Ativas"
        value={data?.data.tasks.active || 0}
        icon={<CheckSquare className="h-5 w-5" />}
        color="primary"
        progress={data?.data.tasks.completedPercent || 0}
        progressLabel={cn(data?.data.tasks.completedPercent || 0, '% concluído')}
      />

      <CDashboard.card
        title="Itens de Compra"
        value={data?.data.shoppingItems.total || 0}
        icon={<ShoppingCart className="h-5 w-5" />}
        color="primary"
        progress={data?.data.shoppingItems.purchasedPercent || 0}
        progressLabel={cn(data?.data.shoppingItems.purchasedPercent || 0, '% comprado')}
      />

      <CDashboard.card
        title="Notas Criadas"
        value={data?.data.notes.total || 0}
        icon={<StickyNote className="h-5 w-5" />}
        color="primary"
        lastUpdated={dateNow()}
      />
    </Fragment>
  )
}
