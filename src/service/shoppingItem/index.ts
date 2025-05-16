import api from '../api'
import {
  TCreateShoppingItemRequest,
  TCreateShoppingItemResponse,
  TGetShoppingItemResponse,
  TUpdateShoppingItemRequest,
  TUpdateShoppingItemResponse
} from './type'

const shoppingItemService = {
  create: async (data: TCreateShoppingItemRequest): Promise<TCreateShoppingItemResponse> =>
    (await api.post('/shopping-item', data)).data,
  get: async (params?: string): Promise<TGetShoppingItemResponse> =>
    (await api.get(`/shopping-item${params}`)).data,
  update: async (data: TUpdateShoppingItemRequest): Promise<TUpdateShoppingItemResponse> =>
    (await api.patch('/shopping-item', data)).data,
  delete: async (id: number): Promise<void> => (await api.delete(`/shopping-item/${id}`)).data
}

export default shoppingItemService
