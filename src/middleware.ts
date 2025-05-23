import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const isAuthorized = !!req.nextauth.token
    const path = req.nextUrl.pathname

    if (!isAuthorized) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (isAuthorized && (path === '/' || path === '/login')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/',
      error: '/'
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */

    '/((?!api|_next/static|_next/image|favicon.ico|public|login).*)'
  ]
}
