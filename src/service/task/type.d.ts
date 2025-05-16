export type TPriority = 'MEDIUM' | 'HIGH' | 'LOW' | 'ALL'
export type TCategory = 'GENERAL' | 'DEVELOPMENT' | 'DESIGN' | 'WORK' | 'SEARCH'
export type TViewMode = 'list' | 'grid' | 'kanban'

export type TCreateTaskRequest = {
  title: string
  priority: TPriority
  category: TCategory
}

export type TTask = {
  id: number
  title: string
  completed: boolean
  priority: TPriority
  category: TCategory
  createdAt: string
  userId: number
}

export type TCreateTaskResponse = {
  success: boolean
  message: string
  data: TNote
}

export type TGetTaskResponse = {
  total: number
  data: TTask[]
}

export type TUpdateTaskRequest = {
  id: number
  title?: string
  completed?: boolean
  priority?: TPriority
  category?: TCategory
}

export type TUpdateTaskResponse = {
  success: boolean
  message: string
  data: TTask
}


