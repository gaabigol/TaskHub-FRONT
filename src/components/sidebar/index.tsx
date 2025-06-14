'use client'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  CheckSquare,
  ShoppingCart,
  StickyNote,
  X,
  LogOut,
  User,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '../toggleTheme'
import { AvatarName } from '../ui/avatar-name'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tarefas', href: '/task', icon: CheckSquare },
  { name: 'Lista de Compras', href: '/shopping', icon: ShoppingCart },
  { name: 'Notas', href: '/note', icon: StickyNote }
]

export default function Sidebar({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { data } = useSession()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setIsOpen])

  if (!mounted) {
    return (
      <div className="fixed md:relative z-20 inset-y-0 left-0 w-64 bg-background dark:bg-background border-r border-border shadow-sm flex flex-col"></div>
    )
  }

  return (
    <Fragment>
      {/* Overlay escuro para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Botão de menu para mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-30 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed md:sticky top-0 z-30 h-screen w-64 transition-transform duration-300 ease-in-out',
          'bg-background dark:bg-background border-r border-border shadow-lg flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border bg-background dark:bg-background">
          <div className="flex items-center space-x-2">
            <span className="text-primary text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </span>
            <h1 className="text-xl font-semibold text-foreground">TASK-HUB</h1>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto bg-background dark:bg-background">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsOpen(false)
                    }
                  }}
                >
                  <div
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group cursor-pointer',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="flex items-center px-4 py-3 border-t border-border bg-background dark:bg-background">
          <AvatarName
            name={data?.user.avatarInitials || ''}
            initials={data?.user.avatarInitials || ''}
            size="sm"
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{data?.user.displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{`@${data?.user.username}`}</p>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
