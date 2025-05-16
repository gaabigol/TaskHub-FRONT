import { z } from 'zod'

export const taskFormSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  category: z.enum(['GENERAL', 'DEVELOPMENT', 'DESIGN', 'WORK', 'SEARCH']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'ALL']),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
