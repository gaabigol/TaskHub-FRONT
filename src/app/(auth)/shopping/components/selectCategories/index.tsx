import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CATEGORIES_LABELS } from './common'

export default function SelectCategories({
  value,
  onValueChange
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full md:w-[200px] cursor-pointer">
        <SelectValue placeholder="Todas as categorias" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL" className="cursor-pointer">
          Todas as categorias
        </SelectItem>
        {CATEGORIES_LABELS.map((category) => (
          <SelectItem key={category.value} value={category.value} className="cursor-pointer">
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
