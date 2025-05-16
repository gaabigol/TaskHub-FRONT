import TaskService from '@/service/task'
import { useQuery } from '@tanstack/react-query'
import { CTask } from '..'
import { Fragment } from 'react'
import { TViewMode } from '@/service/task/type'
import { URLParams } from './common'

export default function ViewTask({
  viewMode,
  showCompleted,
  priorityFilter,
  searchTerm
}: {
  viewMode: TViewMode
  showCompleted: boolean
  priorityFilter: string
  searchTerm: string
}) {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['tasks', viewMode, showCompleted, priorityFilter, searchTerm],
    queryFn: async () => TaskService.get(URLParams(showCompleted, priorityFilter, searchTerm))
  })

  if (isLoading) {
    return <CTask.taskItemSkeleton />
  }

  if (isFetched && data?.total == 0) {
    return <CTask.notFoundTask />
  }

  return (
    <Fragment>
      <CTask.taskViewContainer data={data} viewMode={viewMode} />
    </Fragment>
  )
}
