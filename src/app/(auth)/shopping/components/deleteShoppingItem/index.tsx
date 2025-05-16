import { dateNow } from '@/common/util'
import { Button } from '@/components/ui/button'
import shoppingItemService from '@/service/shoppingItem'
import { TShoppingItem } from '@/service/shoppingItem/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { toast } from 'sonner'

export default function DeleteShoppingItem({ data }: { data: TShoppingItem }) {
  const queryCliente = useQueryClient()

  const { mutateAsync: handleDeleteItemFn } = useMutation({
    mutationFn: (id: number) => shoppingItemService.delete(id),
    onMutate: () => {},
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['shopping-item'] })
      toast('Item de compra excluida com sucesso', {
        description: dateNow()
      })
    },
    onError: () => {
      toast('Erro ao excluir item de compra', {
        description: dateNow()
      })
    }
  })

  const onSubmit = async () => {
    await handleDeleteItemFn(data.id)
  }

  return (
    <Fragment>
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={onSubmit}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Excluir</span>
      </Button>
    </Fragment>
  )
}
