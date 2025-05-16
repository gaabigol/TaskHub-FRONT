import { TGetTaskResponse, TTask, TUpdateTaskRequest } from '@/service/task/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TaskService from '@/service/task'
import { toast } from 'sonner'
import { CTask } from '..'
import { dateNow, formatDate, getPriorityColor, getPriorityLabel } from '@/common/util'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export default function TaskListView({ data: tasks }: { data: TGetTaskResponse | undefined }) {
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
        <h2 className="text-xl font-bold">Lista de Tarefas ({tasks?.total})</h2>
        <div className="flex gap-2">
          <CTask.exportTask />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted py-2 px-4 grid grid-cols-12 text-sm font-medium">
          <div className="col-span-1">Status</div>
          <div className="col-span-4">Título</div>
          <div className="col-span-2">Categoria</div>
          <div className="col-span-2">Prioridade</div>
          <div className="col-span-2">Data</div>
          <div className="col-span-1">Ações</div>
        </div>

        {tasks?.total === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Nenhuma tarefa encontrada. Clique em Nova Tarefa para criar uma.
          </div>
        ) : (
          <div className="divide-y">
            {tasks?.data.map((task: TTask) => (
              <div
                key={task.id}
                className="grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50"
              >
                <div className="col-span-1">
                  <Checkbox
                    className="cursor-pointer"
                    checked={task.completed}
                    onCheckedChange={(checked) => onToggleComplete(task.id, checked as boolean)}
                  />
                </div>
                <div className="col-span-4 font-medium truncate">{task.title}</div>
                <div className="col-span-2">
                  {task.category && <Badge variant="outline">{task.category}</Badge>}
                </div>
                <div className="col-span-2">
                  <span className={getPriorityColor(task.priority)}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {formatDate(task.createdAt)}
                </div>
                <div className="col-span-1 flex gap-2">
                  <CTask.update data={task} />
                  <CTask.delete data={task} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
