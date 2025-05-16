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
      quantity: 1
    }
  })

  const { mutateAsync: handleCreateItemFn, isPending } = useMutation({
    mutationFn: (data: TCreateShoppingItemRequest) => shoppingItemService.create(data),
    onSuccess: () => {
      toast('Item de compra criado com sucesso', {
        description: dateNow()
      })
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] })
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
                          className="w-16 h-10 rounded-r-none"
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
                          <SelectTrigger className="h-10 w-20 rounded-l-none border-l-0">
                            <SelectValue placeholder="un" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
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
                        <SelectTrigger className="h-10 w-[150px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Geral">Geral</SelectItem>
                        <SelectItem value="Mercearia">Mercearia</SelectItem>
                        <SelectItem value="Frutas">Frutas</SelectItem>
                        <SelectItem value="Legumes">Legumes</SelectItem>
                        <SelectItem value="Laticínios">Laticínios</SelectItem>
                        <SelectItem value="Padaria">Padaria</SelectItem>
                        <SelectItem value="Carnes">Carnes</SelectItem>
                        <SelectItem value="Bebidas">Bebidas</SelectItem>
                        <SelectItem value="Limpeza">Limpeza</SelectItem>
                        <SelectItem value="Casa">Casa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-10 bg-secondary hover:bg-secondary/90"
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
