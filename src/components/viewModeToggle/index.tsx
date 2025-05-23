import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { List, Grid3x3, Kanban } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ViewMode = 'list' | 'grid' | 'kanban'

interface ViewModeToggleProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
  className?: string
  availableModes?: ViewMode[]
}

export function ViewModeToggle({
  value,
  onChange,
  className,
  availableModes = ['list', 'grid', 'kanban']
}: ViewModeToggleProps) {
  const handleValueChange = (value: string) => {
    if (value) {
      onChange(value as ViewMode)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getToggleItemClassNames = (itemValue: string) => {
    return cn(

      'data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer',
      'data-[state=on]:hover:bg-primary/90 cursor-pointer'
    )
  }

  return (
    <ToggleGroup
      type="single"
      size="sm"
      value={value}
      onValueChange={handleValueChange}
      className={cn('border rounded-md', className)}
    >
      {availableModes.includes('list') && (
        <ToggleGroupItem
          value="list"
          aria-label="Visualização em lista"
          className={getToggleItemClassNames('list')}
        >
          <List className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-2">Lista</span>
        </ToggleGroupItem>
      )}

      {availableModes.includes('grid') && (
        <ToggleGroupItem
          value="grid"
          aria-label="Visualização em grade"
          className={getToggleItemClassNames('grid')}
        >
          <Grid3x3 className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-2">Grade</span>
        </ToggleGroupItem>
      )}

      {availableModes.includes('kanban') && (
        <ToggleGroupItem
          value="kanban"
          aria-label="Visualização em kanban"
          className={getToggleItemClassNames('kanban')}
        >
          <Kanban className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-2">Kanban</span>
        </ToggleGroupItem>
      )}
    </ToggleGroup>
  )
}
