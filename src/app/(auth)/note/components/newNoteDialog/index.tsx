import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteFormSchema, NoteFormValues } from './common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { TCreateNoteRequest } from '@/service/note/type'
import NoteService from '@/service/note'
import { toast } from 'sonner'
import { dateNow } from '@/common/util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

export default function NewNoteDialog() {
  const [showNewNoteDialog, setShowNewNoteDialog] = useState<boolean>(false)
  const queryCliente = useQueryClient()
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: '',
      content: '',
      color: 'BLUE'
    }
  })

  const { mutateAsync: handleCreateNoteFn } = useMutation({
    mutationFn: (data: TCreateNoteRequest) => NoteService.create(data),
    onMutate: () => {},
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['notes'] })
      toast('Nota criada com sucesso', {
        description: dateNow()
      })
      setShowNewNoteDialog(false)
    },
    onError: () => {
      toast('Erro ao criar Nota', {
        description: dateNow()
      })
    }
  })

  const onSubmit = async (data: NoteFormValues) => {
    await handleCreateNoteFn({
      title: data.title,
      content: data.content,
      color: data.color || 'BLUE'
    })
    form.reset()
  }

  return (
    <>
      <Button onClick={() => setShowNewNoteDialog(true)} className="cursor-pointer text-white">
        <Plus className="h-4 w-4 mr-2" />
        Nova Nota
      </Button>

      <Dialog open={showNewNoteDialog} onOpenChange={setShowNewNoteDialog}>
        <DialogContent className="sm:max-w-[550px] dark:bg-sidebar">
          <DialogHeader>
            <DialogTitle>Nova Nota</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da nota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        placeholder="Conteúdo da nota..."
                        value={field.value}
                        onChange={field.onChange}
                        className="min-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Selecionar cor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="BLUE">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                            Azul
                          </div>
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="GREEN">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                            Verde
                          </div>
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="PURPLE">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                            Roxo
                          </div>
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="YELLOW">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                            Amarelo
                          </div>
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="RED">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                            Vermelho
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setShowNewNoteDialog(false)}
                >
                  Cancelar
                </Button>
                <Button className="cursor-pointer text-white" type="submit">
                  Salvar Nota
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
