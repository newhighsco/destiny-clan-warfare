import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Bungie({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET,
      headers: {
        'X-API-Key': process.env.BUNGIE_API_KEY
      }
    })
  ],
  callbacks: {
    jwt: async (token, user, account) => {
      if (account) {
        token.accessToken = account.accessToken
        token.refreshToken = account.refreshToken
      }

      return Promise.resolve(token)
    },
    session: async (session, token) => {
      session.membershipId = token.sub
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken

      return Promise.resolve(session)
    }
  }
})
