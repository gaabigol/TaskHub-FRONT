import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { ShoppingUpdateFormValues, shoppingItemUptemFormSchema, units } from './common'
import { zodResolver } from '@hookform/resolvers/zod'
import { TShoppingItem, TUpdateShoppingItemRequest } from '@/service/shoppingItem/type'
import shoppingItemService from '@/service/shoppingItem'
import { toast } from 'sonner'
import { dateNow } from '@/common/util'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Pencil, Plus } from 'lucide-react'
import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export default function UpdateShoppingItem({ data: item }: { data: TShoppingItem }) {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const form = useForm<ShoppingUpdateFormValues>({
    resolver: zodResolver(shoppingItemUptemFormSchema),
    defaultValues: {
      quantity: item.quantity,
      category: item.category,
      name: item.name,
      unit: item.unit
    }
  })

  const { mutateAsync: handleCreateItemFn, isPending } = useMutation({
    mutationFn: (data: TUpdateShoppingItemRequest) => shoppingItemService.update(data),
    onSuccess: () => {
      toast('Item de compra criado com sucesso', {
        description: dateNow()
      })
      queryClient.invalidateQueries({ queryKey: ['shopping-item'] })
      form.reset()
    },
    onError: () => {
      toast('Erro ao criar item de compra', {
        description: dateNow()
      })
    }
  })

  const onSubmit = async (data: ShoppingUpdateFormValues) => {
    await handleCreateItemFn({
      id: item.id,
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
      category: data.category
    })
  }

  return (
    <Fragment>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => setShowDialog(true)}
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Editar</span>
      </Button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md p-0 overflow-hidden dark:bg-sidebar text-white border-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-lg font-medium">Editar Item de compra</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 pt-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Item de compra"
                        className="bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-2">
                <div className="flex-none w-32">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            className="bg-gray-800 border-gray-700 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-none w-32">
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="cursor-pointer">
                              <SelectValue placeholder="un" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {units.map((unit) => (
                              <SelectItem key={unit} value={unit} className="cursor-pointer">
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-10 w-[150px] cursor-pointer">
                              <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem className="cursor-pointer" value="GENERAL">
                              Geral
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="GROCERY">
                              Mercearia
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="FRUITS">
                              Frutas
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="VEGETABLES">
                              Legumes
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="DAIRY">
                              Laticínios
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="BAKERY">
                              Padaria
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="MEAT">
                              Carnes
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="BEVERAGES">
                              Bebidas
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="CLEANING">
                              Limpeza
                            </SelectItem>
                            <SelectItem className="cursor-pointer" value="HOUSEHOLD">
                              Casa
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="flex justify-end space-x-2 pt-4 border-t border-gray-800">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white cursor-pointer"
                  onClick={() => setShowDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className=" text-white cursor-pointer" disabled={isPending}>
                  <Plus className="mr-1 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
