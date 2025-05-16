import api from '../api'
import { TGetActivityResponse } from './type'

const ActivityService = {
  get: async (): Promise<TGetActivityResponse> => 
    (await api.get('/activity')).data
}

export default ActivityService
