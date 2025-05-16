import { z } from 'zod'
export const noteFormSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  content: z.string().min(5, 'Conteúdo deve ter pelo menos 5 caracteres'),
  color: z.enum(['BLUE', 'GREEN', 'PURPLE', 'YELLOW', 'RED']).optional()
})

export type NoteFormValues = z.infer<typeof noteFormSchema>
