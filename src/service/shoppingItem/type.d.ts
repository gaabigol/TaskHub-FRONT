export type TUnit = 'UN' | 'KG ' | 'G' | 'L' | 'ML' | 'PCT' | 'CX'
export type TShippingCategory =
  | 'GENERAL'
  | 'GROCERY'
  | 'FRUITS'
  | 'VEGETABLES'
  | 'DAIRY'
  | 'BAKERY'
  | 'MEAT'
  | 'BEVERAGES '
  | 'CLEANING'
  | 'HOUSEHOLD'

export type TShoppingItem = {
  id: number
  name: string
  quantity: number
  unit: TUnit
  category: TShippingCategory
  purchased: boolean
  createdAt: string
  updatedAt: string
  userId: number
}

export type TCreateShoppingItemRequest = {
  name: string
  quantity: number
  unit: TUnit
  category: TShippingCategory
}

export type TCreateShoppingItemResponse = {
  success: boolean
  message: string
  data: TShoppingItem
}

export type TGetShoppingItemResponse = {
  total: number
  data: TShoppingItem[]
}

export type TUpdateShoppingItemRequest = {
  id: number
  name?: string
  quantity?: number
  unit?: TUnit
  category?: TShippingCategory
  purchased?: boolean
}

export type TUpdateShoppingItemResponse = {
  success: boolean
  message: string
  data: TShoppingItem
}
