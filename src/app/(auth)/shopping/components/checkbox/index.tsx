import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function CheckboxPurchased({
  checked,
  onCheckedChange
}: {
  onCheckedChange: (checked: boolean) => void
  checked: boolean
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="showPurchased" checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor="showPurchased">Mostrar comprados</Label>
    </div>
  )
}
