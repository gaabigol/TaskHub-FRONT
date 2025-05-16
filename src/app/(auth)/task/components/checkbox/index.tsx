import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@radix-ui/react-label'

export default function CheckboxTask({
  checked,
  onCheckedChange
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="showCompleted"
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
      />
      <Label htmlFor="showCompleted">Mostrar concluídas</Label>
    </div>
  )
}
