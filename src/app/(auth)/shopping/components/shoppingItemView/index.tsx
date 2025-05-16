import shoppingItemService from '@/service/shoppingItem'
import { useQuery } from '@tanstack/react-query'
import { CShopping } from '..'
import { Fragment } from 'react'
import { ShoppingCart } from 'lucide-react'
import { TShoppingItem, TUnit } from '@/service/shoppingItem/type'
import { URLParams } from './common'

export default function ShoppingItemView({
  name,
  purchased,
  unit,
  category
}: {
  name?: string
  purchased?: boolean
  unit?: TUnit
  category?: string
}) {
  const {
    data: items,
    isLoading,
    isFetched
  } = useQuery({
    queryKey: ['shopping-item', name, purchased, unit, category],
    queryFn: async () => shoppingItemService.get(URLParams(name, purchased, unit, category))
  })

  if (isLoading) {
    return (
      <Fragment>
        <CShopping.skeleton />
        <CShopping.skeleton />
        <CShopping.skeleton />
      </Fragment>
    )
  }

  if ((isFetched && items?.total == 0) || !items?.data) {
    return (
      <div className="p-8 text-center text-foreground-light">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
          <ShoppingCart className="h-8 w-8 text-foreground-light" />
        </div>
        <h3 className="text-base font-medium mb-1">Sua lista de compras está vazia</h3>
        <p className="text-sm">Adicione itens para começar a criar sua lista de compras.</p>
      </div>
    )
  }

  return (
    <Fragment>
      {items.data.map((item: TShoppingItem) => (
        <CShopping.shoppingItem key={item.id} data={item} />
      ))}
    </Fragment>
  )
}
