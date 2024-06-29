import type { NextAuthOptions } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
} satisfies NextAuthOptions;
