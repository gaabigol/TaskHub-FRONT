import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FileDown } from 'lucide-react'

export default function NoteExportDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FileDown className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Exportar como PDF</DropdownMenuItem>
        <DropdownMenuItem>Exportar como CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
