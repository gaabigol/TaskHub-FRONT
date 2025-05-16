import { z } from 'zod'
export const noteUpdateSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres').optional(),
  content: z.string().min(5, 'Conteúdo deve ter pelo menos 5 caracteres').optional(),
  color: z.enum(['BLUE', 'GREEN', 'PURPLE', 'YELLOW', 'RED']).optional()
})

export type NoteUpdateValues = z.infer<typeof noteUpdateSchema>

export const formatUpdateRequest = (data: NoteUpdateValues) => {
  const payload: Record<string, string> = {}
  if (data.title !== undefined) {
    payload.title = data.title
  }

  if (data.content !== undefined) {
    payload.content = data.content
  }

  if (data.color !== undefined) {
    payload.color = data.color
  }

  return payload
}
