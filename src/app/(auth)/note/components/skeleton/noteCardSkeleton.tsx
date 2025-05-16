import { Skeleton } from '@/components/ui/skeleton'

export default function NoteCardSkeleton() {
  return (
    <div className="rounded-lg bg-white dark:bg-background-dark shadow-sm p-4 border-t-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <Skeleton className="h-6 w-[120px] mb-2" />
        <div className="flex space-x-1">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>

      <div className="mb-3">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <div className="flex items-center space-x-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      </div>
    </div>
  )
}
