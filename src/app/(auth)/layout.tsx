import { authOptions } from '@/service/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'
interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/')
  }
  return <Fragment>{children}</Fragment>
}
