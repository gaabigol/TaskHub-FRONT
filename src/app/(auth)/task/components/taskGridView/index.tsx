import { TGetTaskResponse, TTask, TUpdateTaskRequest } from '@/service/task/type'
import { CTask } from '..'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { dateNow, formatDate, getCategoryLabel, getPriorityColor, getPriorityLabel } from '@/common/util'
import TaskService from '@/service/task'
import { Badge } from '@/components/ui/badge'

export default function TaskGridView({ data }: { data: TGetTaskResponse | undefined }) {
  const queryClient = useQueryClient()
  const { mutateAsync: updateTaskFn } = useMutation({
    mutationFn: async (task: TUpdateTaskRequest) => TaskService.update(task),
    onSuccess: () => {
      toast('Tarefa atualizada com sucesso', {
        description: dateNow()
      })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => {
      toast('Ocorreu um erro ao atualizar a tarefa', {
        description: dateNow()
      })
    }
  })

  const onToggleComplete = async (id: number, completed: boolean) => {
    await updateTaskFn({ id, completed })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Tarefas ({data?.total})</h2>
        <div className="flex gap-2">
          <CTask.exportTask />
        </div>
      </div>

      {data?.total === 0 ? (
        <div className="p-8 text-center border rounded-lg text-muted-foreground">
          Nenhuma tarefa encontrada. Clique em Nova Tarefa para criar uma.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data.map((task: TTask) => (
            <Card key={task.id} className={task.completed ? 'opacity-70' : ''}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg truncate flex-1">{task.title}</CardTitle>
                  <Checkbox
                    className="cursor-pointer"
                    checked={task.completed}
                    onCheckedChange={(checked) => onToggleComplete(task.id, checked as boolean)}
                  />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex gap-2 mb-2 flex-wrap">
                  {task.category && <Badge variant="outline">{getCategoryLabel(task.category)}</Badge>}
                  <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                    {getPriorityLabel(task.priority)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Criado em {formatDate(task.createdAt)}
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end gap-2">
                <CTask.update data={task} />
                <CTask.delete data={task} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
