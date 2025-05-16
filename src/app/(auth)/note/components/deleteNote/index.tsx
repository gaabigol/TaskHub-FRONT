import { dateNow } from '@/common/util'
import { Button } from '@/components/ui/button'
import NoteService from '@/service/note'
import { TNote } from '@/service/note/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { toast } from 'sonner'

export default function DeleteNote({ data }: { data: TNote }) {
  const queryCliente = useQueryClient()

  const { mutateAsync: handleDeleteNoteFn } = useMutation({
    mutationFn: (id: number) => NoteService.delete(id),
    onMutate: () => {},
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['notes'] })
      toast('Nota excluida com sucesso', {
        description: dateNow()
      })
    },
    onError: () => {
      toast('Erro ao excluir Nota', {
        description: dateNow()
      })
    }
  })

  const onSubmit = async () => {
    await handleDeleteNoteFn(data.id)
  }

  return (
    <Fragment>
      <Button variant="ghost" size="sm" className="cursor-pointer" onClick={onSubmit}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Excluir</span>
      </Button>
    </Fragment>
  )
}
