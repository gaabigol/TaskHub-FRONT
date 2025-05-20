import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { dateNow, formatDate } from '@/common/util'
import { Checkbox } from '@/components/ui/checkbox'
import TaskService from '@/service/task'

export default function UpcomingTaskItem({
  id,
  title,
  completed,
  date
}: {
  id: number
  title: string
  completed: boolean
  date: string
}) {
  const [isChecked, setIsChecked] = useState(completed)
  const queryClient = useQueryClient()

  const formattedDate = formatDate(date)
  const isToday = new Date(date).toDateString() === new Date().toDateString()
  const isTomorrow =
    new Date(date).toDateString() === new Date(Date.now() + 86400000).toDateString()

  let dateDisplay
  if (isToday) {
    dateDisplay = 'Hoje'
  } else if (isTomorrow) {
    dateDisplay = (
      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
        Amanhã
      </Badge>
    )
  } else {
    dateDisplay = formattedDate
  }

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: TaskService.update,
    onSuccess: () => {
      setIsChecked(!isChecked)
      toast('Tarefa atualizada com sucesso', {
        description: dateNow()
      })
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] })
    },
    onError: () => {
      toast('Erro ao atualizar tarefa', {
        description: dateNow()
      })
    }
  })

  return (
    <li className="flex items-center py-2 border-b border-border last:border-0 last:pb-0">
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => {
          updateTask({ id: id, completed: !isChecked })
        }}
        className="mr-3"
      />
      <span className={`ml-3 text-sm ${isChecked ? 'line-through text-foreground-light' : ''}`}>
        {title}
      </span>
      <span className="ml-auto text-xs text-foreground-light">{dateDisplay}</span>
    </li>
  )
}
