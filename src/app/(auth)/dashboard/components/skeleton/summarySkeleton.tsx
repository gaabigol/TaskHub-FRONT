import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SummarySkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-12" />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton className="h-2 w-full rounded-full mb-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}
