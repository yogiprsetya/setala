/* eslint-disable consistent-return */
import { type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentUser = request.cookies.get('setala-token')?.value;

  if (currentUser && request.nextUrl.pathname === '/') {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  if (!currentUser && !pathname.startsWith('/signin')) {
    return Response.redirect(new URL('/signin', request.url));
  }

  if (currentUser && pathname === '/signin') {
    return Response.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
