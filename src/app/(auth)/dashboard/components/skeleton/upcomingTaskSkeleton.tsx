import { Skeleton } from '@/components/ui/skeleton'

export default function UpcomingTaskSkeleton() {
  return (
    <li className="flex items-center py-2 border-b border-border last:border-0">
      <Skeleton className="w-4 h-4 rounded mr-3" />
      <Skeleton className="h-4 flex-1 max-w-[200px]" />
      <Skeleton className="h-5 w-16 ml-auto" />
    </li>
  )
}
