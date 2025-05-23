import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { TaskUpdateValues, formatUpdateRequest, taskUpdateSchema } from './common'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { dateNow } from '@/common/util'
import { toast } from 'sonner'
import { TTask, TUpdateTaskRequest } from '@/service/task/type'
import TaskService from '@/service/task'
import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export default function UpdateTask({ data: task }: { data: TTask }) {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const queryCliente = useQueryClient()

  const form = useForm<TaskUpdateValues>({
    resolver: zodResolver(taskUpdateSchema),
    defaultValues: {
      title: task.title,
      category: task.category,
      priority: task.priority
    }
  })

  const { mutateAsync: handleUpdateTaskFn } = useMutation({
    mutationFn: (data: TUpdateTaskRequest) => TaskService.update(data),
    onMutate: () => {},
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['tasks'] })
      toast('Tarefa criada com sucesso', {
        description: dateNow()
      })
      setShowDialog(false)
    },
    onError: () => {
      toast('Erro ao criar tarefa', {
        description: dateNow()
      })
      setShowDialog(false)
    }
  })

  const onSubmit = async (data: TaskUpdateValues) => {
    await handleUpdateTaskFn({
      id: task.id,
      ...formatUpdateRequest(data)
    })
    form.reset(formatUpdateRequest(data))
  }

  return (
    <Fragment>
      <Button
        variant="ghost"
        size="sm"
        className="cursor-pointer"
        onClick={() => setShowDialog(true)}
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Editar</span>
      </Button>
      <Dialog open={showDialog} onOpenChange={setShowDialog} >
        <DialogContent className="sm:max-w-[550px] p-6 ">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold">Editar Tarefa</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Adicionar nova tarefa..."
                        className="h-10 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3 mt-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 w-full cursor-pointer">
                            <SelectValue placeholder="Categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="cursor-pointer" value="GENERAL">
                            Geral
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="DEVELOPMENT">
                            Desenvolvimento
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="DESIGN">
                            Design
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="SEARCH">
                            Pesquisa
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="WORK">
                            Trabalho
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 w-full cursor-pointer">
                            <SelectValue placeholder="Prioridade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="cursor-pointer" value="MEDIUM">
                            Média
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="HIGH">
                            Alta
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="LOW">
                            Baixa
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6 gap-2 pt-2 ">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setShowDialog(false)}
                >
                  Cancelar
                </Button>
                <Button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white" type="submit">
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
