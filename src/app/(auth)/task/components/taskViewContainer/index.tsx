import { TGetTaskResponse, TViewMode } from '@/service/task/type'
import { CTask } from '..'

export default function TaskViewContainer({
  data,
  viewMode
}: {
  data: TGetTaskResponse | undefined
  viewMode: TViewMode
}) {
  switch (viewMode) {
    case 'grid':
      return <CTask.taskGridView data={data} />
    case 'kanban':
      return <CTask.taskKanbanView data={data} />
    case 'list':
    default:
      return <CTask.taskListView data={data} />
  }
}
