import api from '../api'
import {
  TCreateTaskRequest,
  TCreateTaskResponse,
  TGetTaskResponse,
  TUpdateTaskRequest,
  TUpdateTaskResponse
} from './type'

const TaskService = {
  create: async (data: TCreateTaskRequest): Promise<TCreateTaskResponse> =>
    (await api.post('/task', data)).data,
  get: async (): Promise<TGetTaskResponse> => (await api.get('/task')).data,
  update: async (data: TUpdateTaskRequest): Promise<TUpdateTaskResponse> =>
    (await api.patch('/task', data)).data,
  delete: async (id: number): Promise<void> => (await api.delete(`/task/${id}`)).data,
  exportPdf: async (): Promise<Blob> =>
    (
      await api.get('/task/export/pdf', {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/pdf'
        }
      })
    ).data,
  exportCsv: async (): Promise<Blob> =>
    (
      await api.get('/task/export/csv', {
        responseType: 'blob',
        headers: {
          'Content-Type': 'text/csv'
        }
      })
    ).data
}

export default TaskService
