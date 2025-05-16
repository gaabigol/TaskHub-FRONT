import api from '../api'
import { TGetDashboardResponse } from './type'

const DashboardService = {
  get: async (): Promise<TGetDashboardResponse> => 
    (await api.get('/dashboard')).data
}

export default DashboardService
