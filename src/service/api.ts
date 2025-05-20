import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'
import { toast } from 'sonner'
export const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 100000
})

api.interceptors.request.use(async (config) => {
  const session = await getSession()
  if (session?.user.token) {
    config.headers['Authorization'] = `Bearer ${session?.user.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      signOut({ redirect: false, callbackUrl: '/' })
      toast.error('Sua sessão expirou, faça login novamente')
    }
    return Promise.reject(error)
  }
)

export default api
