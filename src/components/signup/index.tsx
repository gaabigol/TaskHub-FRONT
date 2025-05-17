'use client'

import { useForm } from 'react-hook-form'
import { handleDisplayNameChange, registerSchema, TRegisterUser } from './common'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { dateNow } from '@/common/util'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

export default function SignUp() {
  const form = useForm<TRegisterUser>({
    resolver: zodResolver(registerSchema)
  })

  const { mutateAsync: handleRegisterUserFn, isPending } = useMutation({
    mutationFn: async (data: TRegisterUser) => {
      const response = await fetch('http://localhost:3000/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Erro ao registrar usuário')
      }

      return response.json()
    },
    onSuccess: () => {
      toast('Usuário registrado com sucesso', {
        description: dateNow()
      })
      form.reset()
    },
    onError: (error) => {
      toast(String(error), {
        description: dateNow()
      })
    }
  })

  const onSubmit = async (data: TRegisterUser) => {
    await handleRegisterUserFn(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input placeholder="seu-usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu Nome"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handleDisplayNameChange(form, e)
                  }}
                />
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
              Registrando...
            </>
          ) : (
            'Registrar'
          )}
        </Button>
      </form>
    </Form>
  )
}
