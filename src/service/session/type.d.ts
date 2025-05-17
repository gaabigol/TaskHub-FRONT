import 'next-auth'

declare module 'next-auth' {
  export interface Session {
    exp: number
    iat: number
    jti: string
    sub: string
    user: {
      id: number
      email: string
      username: string
      displayName: string | null
      avatarInitials: string | null
      createdAt: string
      updatedAt: string
      token: string
    }
  }
}
