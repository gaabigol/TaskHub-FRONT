import { dateNow } from '@/common/util'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import shoppingItemService from '@/service/shoppingItem'
import { TShoppingItem, TUpdateShoppingItemRequest } from '@/service/shoppingItem/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { CShopping } from '..'

export default function ShoppingItem({ data: item }: { data: TShoppingItem }) {
  const queryClient = useQueryClient()
  const { mutateAsync: updateShoppingItem } = useMutation({
    mutationFn: async (task: TUpdateShoppingItemRequest) => shoppingItemService.update(task),
    onSuccess: () => {
      toast('Item de compra atualizada com sucesso', {
        description: dateNow()
      })
      queryClient.invalidateQueries({ queryKey: ['shopping-item'] })
    },
    onError: () => {
      toast('Ocorreu um erro ao atualizar o item de compra', {
        description: dateNow()
      })
    }
  })

  const onTogglePurchased = async (id: number, purchased: boolean) => {
    await updateShoppingItem({
      id: id,
      purchased: purchased
    })
  }
  return (
    <div
      className={`p-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group
                ${item?.purchased ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
    >
      <div className="flex-shrink-0">
        <Checkbox
          checked={item.purchased}
          onCheckedChange={(checked) => onTogglePurchased(item.id, !!checked)}
          className="w-4 h-4 text-secondary cursor-pointer"
        />
      </div>

      <div className="ml-3 flex-1">
        <div className="flex items-center">
          <span
            className={`text-sm font-medium ${
              item.purchased ? 'line-through text-foreground-light' : ''
            }`}
          >
            {item.name}
          </span>
          <span className="ml-2 text-xs text-foreground-light">
            {item.quantity} {item.unit}
          </span>
        </div>

        <div className="flex items-center text-xs text-foreground-light mt-1">
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-foreground-light">
            {item.category}
          </span>
        </div>
      </div>
      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[100px] p-1">
            <div className="grid grid-cols-2 gap-1">
              <div className="p-1.5 hover:bg-gray-800 rounded cursor-pointer flex items-center justify-center">
                <CShopping.updateItem data={item} />
              </div>
              <div className="p-1.5 hover:bg-gray-800 rounded cursor-pointer flex items-center justify-center">
                <CShopping.deleteItem data={item} />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
