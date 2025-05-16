import { Skeleton } from '@/components/ui/skeleton'

export default function ActivityItemSkeleton() {
  return (
    <div className="flex items-start pb-4 border-b border-border last:border-0 last:pb-0">
      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
      <div className="ml-3 flex-1">
        <Skeleton className="h-4 w-full max-w-[250px] mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}
