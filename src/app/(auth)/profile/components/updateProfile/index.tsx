import UserService from '@/service/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { handleDisplayNameChange, ProfileFormValues, profileSchema } from './common'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AvatarName } from '@/components/ui/avatar-name'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TUpdateUserRequest } from '@/service/user/type'
import { toast } from 'sonner'
import { dateNow } from '@/common/util'
import { useEffect } from 'react'

export default function UpdateProfile() {
  const {
    data: user,
    isLoading,
    isPending
  } = useQuery({
    queryKey: ['user'],
    queryFn: UserService.get
  })

  const { mutateAsync: handleUpdateUserFn } = useMutation({
    mutationFn: (data: TUpdateUserRequest) => UserService.update(data),
    onSuccess: () => {
      toast('Informações atualizadas com sucesso', {
        description: dateNow()
      })
    },
    onError: () => {
      toast('Erro ao atualizar informações', {
        description: dateNow()
      })
    }
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.data.displayName || '',
      avatarInitials: user?.data.avatarInitials || ''
    }
  })

  const onSubmit = async (data: ProfileFormValues) => {
    await handleUpdateUserFn({
      displayName: data.displayName,
      avatarInitials: data.avatarInitials
    })
  }

  useEffect(() => {
    if (user?.data) {
      form.reset({
        displayName: user.data.displayName || '',
        avatarInitials: user.data.avatarInitials || ''
      })
    }
  }, [user, form])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Meu perfil</CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <AvatarName
            name={user.data.displayName || user.data.username || ''}
            initials={user.data.avatarInitials || ''}
            size="lg"
          />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-medium">{user.data.displayName || user.data.username}</h3>
          <p className="text-sm text-muted-foreground">@{user.data.username}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Seu nome completo"
                      onChange={(e) => handleDisplayNameChange(form, e)}
                    />
                  </FormControl>
                  <FormDescription>
                    Este é o nome que será exibido para você no sistema.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatarInitials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iniciais do avatar</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Iniciais" maxLength={3} />
                  </FormControl>
                  <FormDescription>
                    Iniciais que aparecem no seu avatar (máximo 3 caracteres).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4" disabled={isPending}>
              {isPending ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Nome de usuário não pode ser alterado</p>
      </CardFooter>
    </Card>
  )
}
