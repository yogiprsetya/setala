import NextAuth from 'next-auth';
import { authConfig } from '~/auth.config';
import GoogleProvider from 'next-auth/providers/google';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export const handler = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? '',
      clientSecret: GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
});

export { handler as GET, handler as POST };
