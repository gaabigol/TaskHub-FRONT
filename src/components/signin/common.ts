import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
})


export type TSignIn = z.infer<typeof signInSchema>