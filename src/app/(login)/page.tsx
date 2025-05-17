'use client'

import SignIn from '@/components/signin'
import SignUp from '@/components/signup'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { TabsList } from '@/components/ui/tabs'
import { useState } from 'react'

export default function Auth() {
  const [activeTab, setActiveTab] = useState<string>('login')

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">DiárioUtil</CardTitle>
            <CardDescription>Entre com sua conta ou crie uma nova</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Registrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <SignIn />
              </TabsContent>

              <TabsContent value="register">
                <SignUp />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {activeTab === 'login' ? (
                <>
                  Não tem uma conta?{' '}
                  <Button variant="link" className="p-0" onClick={() => setActiveTab('register')}>
                    Registre-se
                  </Button>
                </>
              ) : (
                <>
                  Já tem uma conta?{' '}
                  <Button variant="link" className="p-0" onClick={() => setActiveTab('login')}>
                    Faça login
                  </Button>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Seção de apresentação */}
      <div className="hidden md:flex flex-1 bg-primary text-primary-foreground">
        <div className="flex flex-col justify-center p-12 max-w-xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Bem-vindo ao DiárioUtil</h1>
          <p className="text-xl mb-8">
            Seu assistente pessoal para gerenciar tarefas diárias, listas de compras e anotações
            importantes.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary-foreground/20 p-2 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Gestão de Tarefas</h3>
                <p className="text-primary-foreground/70">
                  Organize suas tarefas por prioridade e categoria
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-foreground/20 p-2 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Lista de Compras</h3>
                <p className="text-primary-foreground/70">
                  Crie listas de compras organizadas por categorias
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-foreground/20 p-2 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 11h1v5h-1" />
                  <path d="M12 7h.01" />
                  <path d="M20.3 15.7a9 9 0 1 1-12.6-12.6 9 9 0 0 1 12.6 12.6Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Anotações</h3>
                <p className="text-primary-foreground/70">
                  Salve informações importantes com editor de texto formatado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
