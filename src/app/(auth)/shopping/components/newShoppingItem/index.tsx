import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { shoppingItemFormSchema, ShoppingItemFormValues, units } from './common'
import { zodResolver } from '@hookform/resolvers/zod'
import { TCreateShoppingItemRequest } from '@/service/shoppingItem/type'
import shoppingItemService from '@/service/shoppingItem'
import { toast } from 'sonner'
import { dateNow } from '@/common/util'
import { Card, CardContent } from '@/components/ui/card'
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
import { Plus } from 'lucide-react'

export default function NewShoppingItem() {
  const queryClient = useQueryClient()

  const form = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemFormSchema),
    defaultValues: {
      quantity: 1,
      unit: 'UN',
      category: 'GENERAL',
      name: ''
    }
  })

  const { mutateAsync: handleCreateItemFn, isPending } = useMutation({
    mutationFn: (data: TCreateShoppingItemRequest) => shoppingItemService.create(data),
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

  const onSubmit = async (data: ShoppingItemFormValues) => {
    await handleCreateItemFn(data)
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Adicionar item à lista..." className="h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-3">
              <div className="flex">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          className="w-16 rounded-r-none cursor-pointer"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-20 w-20 rounded-l-none border-l-0 cursor-pointer">
                            <SelectValue placeholder="un" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit} className='cursor-pointer'>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

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

              <Button
                type="submit"
                className="h-10 bg-primary text-white cursor-pointer"
                disabled={isPending}
              >
                <Plus className="mr-1 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
