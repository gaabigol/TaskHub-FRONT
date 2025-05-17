import { calculateInitials } from '@/app/(auth)/profile/components/updateProfile/common'
import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string().min(3, { message: 'O nome do usuário deve ser maior do que 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
  displayName: z.string().min(3, { message: 'O nome completo deve ter pelo menos 3 caracteres' })
})

export type TRegisterUser = z.infer<typeof registerSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDisplayNameChange(form: any, e: React.ChangeEvent<HTMLInputElement>) {
  const displayName = e.target.value || ''
  form.setValue('displayName', displayName)

  const initials = calculateInitials(displayName)
  form.setValue('avatarInitials', initials)
}
