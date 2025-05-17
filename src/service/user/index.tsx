import api from '../api'

import {
  TCreateUserRequest,
  TCreateUserResponse,
  TGetUserResponse,
  TUpdateUserRequest,
  TUpdateUserResponse
} from './type'

const UserService = {
  create: async (data: TCreateUserRequest): Promise<TCreateUserResponse> =>
    (await api.post('/user', data)).data,
  update: async (data: TUpdateUserRequest): Promise<TUpdateUserResponse> =>
    (await api.patch('/user', data)).data,
  get: async (): Promise<TGetUserResponse> => (await api.get('/user')).data
}

export default UserService
