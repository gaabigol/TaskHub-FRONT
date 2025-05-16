import axios from 'axios'
//import { getSession, signOut } from 'next-auth/react'
//import { toast } from 'sonner'
export const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 100000
})

api.interceptors.request.use(async (config) => {
  config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZ2FiaWdvbF85NkBpY2xvdWQuY29tIiwiaWF0IjoxNzQ3MjQ5NTQ3LCJleHAiOjE3NDk4NDE1NDcsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.QTcMcwF7WXF-zdZjSOPwKBXUVV3bWVSqS9paRpsHkuA`
  //const session = await getSession()
  //if (session?.user.accessToken) {
  //  config.headers['Authorization'] = `Bearer ${session.user.accessToken}`
  //} else if (session?.user.accessToken) {
  //  config.headers['Authorization'] = `Bearer ${session.user.accessToken}`
  //}
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      // signOut({ redirect: false, callbackUrl: '/' })
      // toast.error('Sua sessão expirou, faça login novamente')
    }
    return Promise.reject(error)
  }
)

export default api
