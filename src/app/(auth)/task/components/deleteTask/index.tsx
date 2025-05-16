import { dateNow } from '@/common/util'
import { Button } from '@/components/ui/button'
import TaskService from '@/service/task'
import { TTask } from '@/service/task/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function DeleteTask({ data }: { data: TTask }) {
  const queryClient = useQueryClient()

  const { mutateAsync: handleDeleteTaskFn } = useMutation({
    mutationFn: (id: number) => TaskService.delete(id),
    onMutate: () => {},
    onSuccess: () => {
      toast('Tarefa excluida com sucesso', {
        description: dateNow()
      })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => {
      toast('Erro ao excluir Tarefa', {
        description: dateNow()
      })
    }
  })

  const onSubmit = async () => {
    await handleDeleteTaskFn(data.id)
  }

  return (
    <Button variant="ghost" size="sm" className="cursor-pointer" onClick={onSubmit}>
      <Trash2 className="h-4 w-4 mr-1" />
      Excluir
    </Button>
  )
}
