import { TGetTaskResponse, TUpdateTaskRequest } from '@/service/task/type'
import { CTask } from '..'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TaskService from '@/service/task'
import { toast } from 'sonner'
import { buildQuery, dateNow, getPriorityColor, getPriorityLabel } from '@/common/util'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function TaskKanbanView({ data: tasks }: { data: TGetTaskResponse | undefined }) {
  const pendingTasks = tasks?.data.filter((task) => !task.completed)
  const { data: completedTasks } = useQuery({
    queryKey: ['completed-tasks'],
    queryFn: async () => TaskService.get(buildQuery({ completed: true }))
  })

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
        <h2 className="text-xl font-bold">Quadro de Tarefas</h2>
        <div className="flex gap-2">
          <CTask.exportTask />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 bg-background">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
            Pendentes ({pendingTasks?.length})
          </h3>

          <div className="space-y-3">
            {pendingTasks?.length === 0 ? (
              <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                Nenhuma tarefa pendente
              </div>
            ) : (
              pendingTasks?.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="p-3 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base truncate">{task.title}</CardTitle>
                      <Checkbox
                        className="cursor-pointer"
                        checked={task.completed}
                        onCheckedChange={(checked) => onToggleComplete(task.id, checked as boolean)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <div className="flex gap-2 mb-1 flex-wrap">
                      {task.category && (
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className={cn('text-xs', getPriorityColor(task.priority))}
                      >
                        {getPriorityLabel(task.priority)}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex justify-end gap-1">
                    <CTask.update data={task} />
                    <CTask.delete data={task} />
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-muted/30">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
            Concluídas ({completedTasks?.total})
          </h3>

          <div className="space-y-3">
            {completedTasks?.total === 0 ? (
              <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                Nenhuma tarefa concluída
              </div>
            ) : (
              completedTasks?.data?.map((task) => (
                <Card key={task.id} className="opacity-80 hover:opacity-100 transition-opacity">
                  <CardHeader className="p-3 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base truncate">{task.title}</CardTitle>
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) => onToggleComplete(task.id, checked as boolean)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <div className="flex gap-2 mb-1 flex-wrap">
                      {task.category && (
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getPriorityColor(task.priority)}`}
                      >
                        {getPriorityLabel(task.priority)}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex justify-end gap-1">
                    <CTask.update data={task} />
                    <CTask.delete data={task} />
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
