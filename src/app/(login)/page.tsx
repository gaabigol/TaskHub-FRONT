'use client'
import FeatureShowcase from '@/components/featureShowcase'
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
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Auth() {
  const [activeTab, setActiveTab] = useState<string>('login')
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return null
  }
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-4 ">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">TASK-HUB</CardTitle>
            <CardDescription>Entre com sua conta ou crie uma nova</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="login"
                  className="cursor-pointer dark:data-[state=active]:bg-white/10"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="cursor-pointer dark:data-[state=active]:bg-white/10"
                >
                  Registrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <SignIn />
              </TabsContent>

              <TabsContent value="register">
                <SignUp onSuccess={setActiveTab} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {activeTab === 'login' ? (
                <>
                  Não tem uma conta?{' '}
                  <Button
                    variant="link"
                    className="p-0 cursor-pointer"
                    onClick={() => setActiveTab('register')}
                  >
                    Registre-se
                  </Button>
                </>
              ) : (
                <>
                  Já tem uma conta?{' '}
                  <Button
                    variant="link"
                    className="p-0 cursor-pointer"
                    onClick={() => setActiveTab('login')}
                  >
                    Faça login
                  </Button>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>
      <FeatureShowcase />
    </div>
  )
}
