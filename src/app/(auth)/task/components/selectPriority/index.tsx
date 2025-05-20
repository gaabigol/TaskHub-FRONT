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
      <SelectTrigger className="w-full md:w-[200px] cursor-pointer">
        <SelectValue className="cursor-pointer" placeholder="Todas as prioridades" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        <SelectItem className="cursor-pointer" value="ALL">
          Todas as prioridades
        </SelectItem>
        <SelectItem className="cursor-pointer" value="HIGH">
          Alta prioridade
        </SelectItem>
        <SelectItem className="cursor-pointer" value="MEDIUM">
          Média prioridade
        </SelectItem>
        <SelectItem className="cursor-pointer" value="LOW">
          Baixa prioridade
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
