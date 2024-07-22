import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import querystring from 'querystring';
import api from '@/service/api';
import { NextApiRequest, NextApiResponse } from 'next';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        try {
          const request = await api.post(
            'login/',
            querystring.stringify({
              username: credentials.username,
              password: credentials.password,
              application: 'digital-asset',
            }),
          );

          console.log('Request', request);
          const fetch = request.data;

          if (fetch && fetch.user) {
            const user = {
              id: fetch.user.id,
              username: fetch.user.username,
              image: fetch.user.pic,
              email: fetch.user.email,
              name: fetch.user.name,
              role: fetch.roles,
            };
            console.log('User', user);
            return user;
          } else {
            console.log('Error: No user found');
            return null;
          }
        } catch (err: any) {
          console.log('Error in authorize function', err);

          if (err.response && err.response.data) {
            console.error('API Error Response:', err.response.data);
          } else {
            console.error('Error:', err.message);
          }

          return null;
        }
      },
    }),
  ],
  callback: {
    async signIn({ user, account, profile, email, credentials }: { user: any; account: any; profile: any; email: any; credentials: any }) {
      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.pic = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.pic = token.pic;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: 'q4Xg+OFI5fJLajetnWK0WPB1l36vPEjkfDyF8RDEXu4=',
};

// export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
  export default NextAuth(authOptions);
// }
