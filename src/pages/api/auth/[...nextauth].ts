import NextAuth from 'next-auth'
import Credential from 'next-auth/providers/credentials'
import querystring from 'querystring'
import api from '../../../service/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'next-auth/jwt'

export const authOptions = {
  providers: [
    Credential({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        let fetch
        try {
          const request = await api.post(
            'login/',
            querystring.stringify({
              username: credentials.username,
              password: credentials.password,
              application: 'digital-asset',
            }),
          )
          console.log("Request", request)
          fetch = request.data
          if (fetch && fetch.user) {
            const user = {
              id: fetch.user.id,
              username: fetch.user.username,
              image: fetch.user.pic,
              email: fetch.user.email,
              name: fetch.user.name,
              role: fetch.roles,
            }
            console.log("User", user)
            return user
          } else {
            console.log("Error")
            return null
          }
        } catch (err: any) {
          if (err.response) {
            fetch = err.response.data
          }
          console.log("Fatal Error")
          return null
        }
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }: { user: any, account: any, profile: any, email: any, credentials: any }) {
  //     return true
  //   },
  //   async jwt({ token, user }: { token: JWT, user: any }) {
  //     if (user) {
  //       token.id = user.id
  //       token.username = user.username
  //       token.pic = user.image
  //       token.role = user.role
  //     }
  //     return token
  //   },
  //   async session({ session, token }: { session: any, token: JWT }) {
  //     session.accessToken = token.accessToken
  //     session.user.id = token.id
  //     session.user.username = token.username
  //     session.user.pic = token.pic
  //     session.user.role = token.role
  //     return session
  //   },
  // },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.AUTH_SECRET,
}

export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions)
}