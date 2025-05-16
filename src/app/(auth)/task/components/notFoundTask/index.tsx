import { CheckIcon } from 'lucide-react'

export default function NotFoundTask() {
  return (
    <div className="p-8 text-center text-muted-foreground bg-background border rounded-lg">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <CheckIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium mb-1">Nenhuma tarefa encontrada</h3>
      <p className="text-sm">Adicione uma nova tarefa para começar.</p>
    </div>
  )
}
