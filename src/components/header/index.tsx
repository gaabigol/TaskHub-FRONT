import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function PageHeader({
  title,
  onToggleSidebar,
  showSearch = true,
  onSearch,
  searchValue = ''
}: {
  title: string
  onToggleSidebar: () => void
  showSearch?: boolean
  onSearch?: (value: string) => void
  searchValue?: string
}) {
  return (
    <header className="border-b border-border h-16 flex items-center px-4 md:px-6 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="mr-4 text-foreground-light md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex-1 flex justify-between items-center">
        <h2 className="text-lg font-medium">{title}</h2>

        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Pesquisar..."
                className="w-64 h-9 pl-9 pr-4"
                value={searchValue}
                onChange={(e) => onSearch && onSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground-light" />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground-light hover:text-foreground transition-colors"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute top-0 right-0 w-2 h-2 p-0 bg-accent" />
            <span className="sr-only">Notificações</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
