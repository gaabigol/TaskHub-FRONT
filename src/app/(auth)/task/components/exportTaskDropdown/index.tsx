import { dateNow } from '@/common/util'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import TaskService from '@/service/task'
import { useMutation } from '@tanstack/react-query'
import { FileDown } from 'lucide-react'
import { toast } from 'sonner'

export default function TaskExportDropdown() {
  const { mutateAsync: handleDownloadPdfFn } = useMutation({
    mutationFn: async () => {
      return TaskService.exportPdf()
    },
    onMutate: () => {
      return toast('Exportando tarefas para PDF', {
        description: dateNow()
      })
    },
    onSuccess: (data) => {
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'tarefas.pdf'
      a.click()
      URL.revokeObjectURL(url)

      toast('Tarefas exportadas com sucesso', {
        description: dateNow(),
        action: {
          label: 'Download',
          onClick: () => {
            const a = document.createElement('a')
            a.href = url
            a.download = 'tarefas.pdf'
            a.click()
          }
        }
      })
    },
    onError: () => {
      toast('Occoreu um erro ao tentar exportar as tarefas para PDF', {
        description: dateNow()
      })
    }
  })

  const { mutateAsync: handleDownloadCsvFn } = useMutation({
    mutationFn: async () => {
      return TaskService.exportCsv()
    },
    onMutate: () => {
      return toast('Exportando tarefas para CSV', {
        description: dateNow()
      })
    },
    onSuccess: (data) => {
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'tarefas.csv'
      a.click()
      URL.revokeObjectURL(url)

      toast('Tarefas exportadas com sucesso', {
        description: dateNow(),
        action: {
          label: 'Download',
          onClick: () => {
            const a = document.createElement('a')
            a.href = url
            a.download = 'tarefas.csv'
            a.click()
          }
        }
      })
    },
    onError: () => {
      toast('Occoreu um erro ao tentar exportar as tarefas para CSV', {
        description: dateNow()
      })
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <FileDown className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownloadPdfFn()}>
          Exportar como PDF
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownloadCsvFn()}>
          Exportar como CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
