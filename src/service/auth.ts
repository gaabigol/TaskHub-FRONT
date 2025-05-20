import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      async authorize(credentials) {
        const res = await fetch('http://localhost:3000/v1/auth', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { 'Content-Type': 'application/json' }
        })

        const user = await res.json()

        if (res.ok && user) {
          return user
        }

        return null
      }
    })
  ],
  secret: process.env.AUH_SECRET,
  pages: {
    signIn: '/',
    error: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session = token as any
      return session
    }
  }
}
