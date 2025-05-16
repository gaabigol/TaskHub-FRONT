import { z } from 'zod'

export const taskUpdateSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  category: z.enum(['GENERAL', 'DEVELOPMENT', 'DESIGN', 'WORK', 'SEARCH']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'ALL']),
})

export type TaskUpdateValues = z.infer<typeof taskUpdateSchema>

export const formatUpdateRequest = (data: TaskUpdateValues) => {
  return (
    Object.entries(data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined)
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value
        }),
        {}
      )
  )
}
