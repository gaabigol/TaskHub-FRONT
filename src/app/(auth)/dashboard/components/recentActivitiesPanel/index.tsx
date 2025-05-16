import ActivityService from '@/service/activity'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { CDashboard } from '..'
import { TActivity } from '@/service/activity/type'

export default function RecentActivitiesPanel() {
  const {
    data: activities,
    isLoading,
    isFetched
  } = useQuery({
    queryKey: ['activities'],
    queryFn: ActivityService.get
  })

  if (isLoading) {
    return (
      <Fragment>
        <CDashboard.activitySkeleton />
        <CDashboard.activitySkeleton />
        <CDashboard.activitySkeleton />
      </Fragment>
    )
  }

  if (!activities?.data && activities?.total == 0 && isFetched) {
    return (
      <Fragment>
        <div className="text-center py-6 text-foreground-light">
          Nenhuma atividade recente encontrada.
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {activities?.data.slice(0, 5).map((activity: TActivity) => (
        <CDashboard.activityItem
          key={activity.id}
          type={activity.type}
          description={activity.details}
          timestamp={activity.createdAt}
        />
      ))}
    </Fragment>
  )
}
