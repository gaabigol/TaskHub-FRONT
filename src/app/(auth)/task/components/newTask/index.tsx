import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { taskFormSchema, TaskFormValues } from './common'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
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
import { Plus } from 'lucide-react'
import { dateNow } from '@/common/util'
import { toast } from 'sonner'
import { TCreateTaskRequest } from '@/service/task/type'
import TaskService from '@/service/task'

export default function NewTask() {
  const queryCliente = useQueryClient()

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: ''
    }
  })

  const { mutateAsync: handleCreateTaskFn } = useMutation({
    mutationFn: (data: TCreateTaskRequest) => TaskService.create(data),
    onMutate: () => {},
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['tasks'] })
      toast('Tarefa criada com sucesso', {
        description: dateNow()
      })
    },
    onError: () => {
      toast('Erro ao criar tarefa', {
        description: dateNow()
      })
    }
  })

  const onSubmit = async (data: TaskFormValues) => {
    await handleCreateTaskFn(data)
    form.reset()
  }

  return (
    <Card className="mb-6" id="task-form">
      <CardContent className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3"
            id="task-form-element"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Adicionar nova tarefa..." className="h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10 w-[150px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GENERAL">Geral</SelectItem>
                        <SelectItem value="DEVELOPMENT">Desenvolvimento</SelectItem>
                        <SelectItem value="DESIGN">Design</SelectItem>
                        <SelectItem value="SEARCH">Pesquisa</SelectItem>
                        <SelectItem value="WORK">Trabalho</SelectItem>
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
                        <SelectTrigger className="h-10 w-[120px]">
                          <SelectValue placeholder="Prioridade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MEDIUM">Média</SelectItem>
                        <SelectItem value="HIGH">Alta</SelectItem>
                        <SelectItem value="LOW">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button type="submit" className="h-10">
                <Plus className="mr-1 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
