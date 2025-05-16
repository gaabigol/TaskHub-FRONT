import api from '../api'
import {
  TCreateNoteRequest,
  TCreateNoteResponse,
  TGetNoteResponse,
  TUpdateNoteRequest,
  TUpdateNoteResponse
} from './type'

const NoteService = {
  create: async (data: TCreateNoteRequest): Promise<TCreateNoteResponse> =>
    (await api.post('/note', data)).data,
  update: async (data: TUpdateNoteRequest): Promise<TUpdateNoteResponse> =>
    (await api.patch('/note', data)).data,
  get: async (): Promise<TGetNoteResponse> => (await api.get('/note')).data,
  delete: async (id: number): Promise<void> => (await api.delete(`/note/${id}`)).data
}

export default NoteService
