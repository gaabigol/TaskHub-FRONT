//import { NextAuthOptions, Session } from 'next-auth'
//import CredentialsProvider from 'next-auth/providers/credentials'
//import RefreshTokenService from './auth/index'
//import { TRefreshToken } from './auth/type'
//
//async function refreshAccessToken(session: Session) {
//  try {
//    const res: TRefreshToken = await RefreshTokenService.getRefreshToken(
//      session
//    )
//    session.user.accessToken = res.accessToken
//    return {
//      ...session,
//    }
//  } catch (error) {
//    return {
//      ...session,
//      error: error,
//    }
//  }
//}
//
//export const authOptions: NextAuthOptions = {
//  providers: [
//    CredentialsProvider({
//      name: 'credentials',
//      credentials: {
//        email: { label: 'email', type: 'text' },
//        password: { label: 'password', type: 'password' },
//      },
//
//      async authorize(credentials) {
//        const res = await fetch('https://api-v1-hellem.vercel.app/auth', {
//          method: 'POST',
//          body: JSON.stringify(credentials),
//          headers: { 'Content-Type': 'application/json' },
//        })
//        const user = await res.json()
//
//        if (res.ok && user) {
//          return user
//        }
//        return null
//      },
//    }),
//  ],
//  secret: process.env.AUTH_SECRET,
//  pages: {
//    signIn: '/',
//    error: '/',
//    signOut: '/',
//  },
//  callbacks: {
//    async jwt({ token, user, trigger, session }) {
//      if (user) token.user = user
//      return token
//    },
//    async session({ session, token }) {
//      const expirationDate = new Date(session.expires)
//      const currentDate = new Date()
//
//      if (expirationDate < currentDate) {
//        const res = await refreshAccessToken(session)
//        return res
//      }
//
//      session = token as any
//      return session
//    },
//  },
//}
