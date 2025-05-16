import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function SelectPriority({
  value,
  onValueChange
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="Todas as prioridades" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Todas as prioridades</SelectItem>
        <SelectItem value="HIGH">Alta prioridade</SelectItem>
        <SelectItem value="MEDIUM">Média prioridade</SelectItem>
        <SelectItem value="LOW">Baixa prioridade</SelectItem>
      </SelectContent>
    </Select>
  )
}
