'use client'

import { useForm } from 'react-hook-form'
import { signInSchema, TSignIn } from './common'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { dateNow } from '@/common/util'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  const form = useForm<TSignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutateAsync: handleSignInFn, isPending } = useMutation({
    mutationFn: async (data: TSignIn) => {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (response?.error) {
        return Promise.reject(response.error)
      }

      return response
    },
    onSuccess: () => {
      toast('Login realizado com sucesso', {
        description: dateNow()
      })
      form.reset()
      router.push('/dashboard')
    },
    onError: () => {
      toast('Erro ao fazer login, por favor tente novamente', {
        description: dateNow()
      })
    }
  })

  const onSubmit = async (data: TSignIn) => {
    await handleSignInFn(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>
    </Form>
  )
}
