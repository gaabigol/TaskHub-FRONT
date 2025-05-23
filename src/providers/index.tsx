'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from './theme/themeProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { Toaster } from '@/components/ui/sonner'
import { NextAuthProvider } from './sessionProvider'

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Toaster />
      <NextAuthProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </NextAuthProvider>
    </ThemeProvider>
  )
}
