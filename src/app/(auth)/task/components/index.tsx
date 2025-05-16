import CheckboxTask from './checkbox'
import DeleteTask from './deleteTask'
import TaskExportDropdown from './exportTaskDropdown'
import NewTask from './newTask'
import NotFoundTask from './notFoundTask'
import SelectPriority from './selectPriority'
import TaskItemSkeleton from './skeleton/taskItemSkeleton'
import TaskGridView from './taskGridView'
import { TaskKanbanView } from './taskKanbanView'
import TaskListView from './taskListView'
import TaskViewContainer from './taskViewContainer'
import UpdateTask from './updateTask'
import ViewTask from './viewTask'

export const CTask = {
  newTask: NewTask,
  taskItemSkeleton: TaskItemSkeleton,
  update: UpdateTask,
  delete: DeleteTask,
  exportTask: TaskExportDropdown,
  taskGridView: TaskGridView,
  taskKanbanView: TaskKanbanView,
  taskListView: TaskListView,
  taskViewContainer: TaskViewContainer,
  notFoundTask: NotFoundTask,
  viewTask: ViewTask,
  selectPriority: SelectPriority,
  checkbox: CheckboxTask
}
