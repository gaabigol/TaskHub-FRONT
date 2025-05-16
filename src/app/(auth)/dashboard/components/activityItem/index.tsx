import { formatRelativeTime, getActivityColor, getActivityIcon } from '@/common/util'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

export default function ActivityItem({
  type,
  description,
  timestamp
}: {
  type: string
  description: string
  timestamp: string
}) {
  const iconClass = getActivityIcon(type)
  const colorClass = getActivityColor(type)
  const relativeTime = formatRelativeTime(timestamp)

  return (
    <div className="flex items-start pb-4 border-b border-border last:border-0 last:pb-0">
      <div
        className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}
      >
        <i className={`${iconClass}`}></i>
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm">{description}</p>
        <p className="text-xs text-foreground-light mt-1">{relativeTime}</p>
      </div>
      <Button variant="ghost" size="sm" className="text-foreground-light hover:text-foreground">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}
