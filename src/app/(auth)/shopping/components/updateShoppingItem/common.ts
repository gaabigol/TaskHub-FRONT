import { z } from 'zod'

export const shoppingItemUptemFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  quantity: z.number().min(1, 'Quantidade deve ser pelo menos 1'),
  unit: z.enum(['UN', 'KG', 'G', 'L', 'ML', 'PCT', 'CX'], {
    errorMap: () => ({ message: 'Unidade inválida' })
  }),
  category: z.enum(
    [
      'GENERAL',
      'GROCERY',
      'FRUITS',
      'VEGETABLES',
      'DAIRY',
      'BAKERY',
      'MEAT',
      'BEVERAGES ',
      'CLEANING',
      'HOUSEHOLD'
    ],
    {
      errorMap: () => ({ message: 'Categoria inválida' })
    }
  )
})

export type ShoppingUpdateFormValues = z.infer<typeof shoppingItemUptemFormSchema>

export const units = ['UN', 'KG', 'G', 'L', 'ML', 'PCT', 'CX']
