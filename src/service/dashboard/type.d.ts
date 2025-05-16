export type TGetDashboardResponse = {
  success: boolean
  data: {
    tasks: {
      active: number
      total: number
      completedPercent: number
    }
    notes: {
      total: number
    }
    shoppingItems: {
      purchased: number
      total: number
      purchasedPercent: number
    }
  }
}
