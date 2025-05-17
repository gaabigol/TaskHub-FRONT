import { z } from 'zod'

export const profileSchema = z.object({
  displayName: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  avatarInitials: z.string().max(3, 'Iniciais devem ter no máximo 3 caracteres').optional()
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export function calculateInitials(name: string): string {
  if (!name) return ''

  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDisplayNameChange(form: any, e: React.ChangeEvent<HTMLInputElement>) {
  const newDisplayName = e.target.value
  form.setValue('displayName', newDisplayName)

  if (newDisplayName) {
    const initials = calculateInitials(newDisplayName)
    form.setValue('avatarInitials', initials)
  }
}
