import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { Adapter } from 'next-auth/adapters';
import { db } from '~/config/db';
import { accounts, sessions, users, verificationTokens } from '~/schema/users';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export const nextAuthConfig: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }) {
      const data = { ...session.user } as any;

      if (session.user) {
        // eslint-disable-next-line no-param-reassign
        data.id = token.id ?? '';
      }

      return { ...session, user: data };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? '',
      clientSecret: GOOGLE_CLIENT_SECRET ?? '',
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
};

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
