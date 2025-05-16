export type TActivityType = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'VIEW' | 'OTHER'
export type TEntityType = 'SHOPPING_ITEM' | 'TASK' | 'USER' | 'NOTE' | 'SYSTEM'

export type TActivity = {
  id: number
  type: TActivityType
  entityType: TEntityType
  entityId: number
  details: string
  ipAddress: string
  userAgent: string
  createdAt: string
  userId: number
}

export type TGetActivityResponse = {
  total: number
  data: TActivity[]
}
