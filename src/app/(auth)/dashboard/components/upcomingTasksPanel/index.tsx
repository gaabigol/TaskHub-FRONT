import TaskService from '@/service/task'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { CDashboard } from '..'
import { TTask } from '@/service/task/type'

export default function UpcomingTasksPanel() {
  const {
    data: tasks,
    isLoading,
    isFetched
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => TaskService.get('')
  })

  if (isLoading) {
    return (
      <Fragment>
        <CDashboard.upcomingTaskSkeleton />
        <CDashboard.upcomingTaskSkeleton />
        <CDashboard.upcomingTaskSkeleton />
      </Fragment>
    )
  }

  if (!tasks?.data && tasks?.total == 0 && isFetched) {
    return (
      <Fragment>
        <p className="text-center py-6 text-foreground-light">Você não tem tarefas pendentes.</p>
      </Fragment>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks?.data.slice(0, 5).map((task: TTask) => (
        <CDashboard.upcomingTaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          date={task.createdAt}
        />
      ))}
    </ul>
  )
}
