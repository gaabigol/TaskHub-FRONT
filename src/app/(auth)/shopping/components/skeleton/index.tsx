import { Skeleton } from '@/components/ui/skeleton'

export default function ShoppingItemSkeleton() {
  return (
    <div className="p-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800">
      <Skeleton className="w-4 h-4 rounded" />
      <div className="ml-3 flex-1">
        <Skeleton className="h-5 w-full max-w-[200px] mb-2" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="flex space-x-1">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  )
}
