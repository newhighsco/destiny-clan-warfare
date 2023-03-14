import NextAuth from 'next-auth'
import BungieProvider from 'next-auth/providers/bungie'

import { signInUrl, signOutUrl } from '~helpers/urls'
import { getMemberClans } from '~libs/bungie'

export default NextAuth({
  providers: [
    BungieProvider({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET
      // headers: {
      //   'X-API-Key': process.env.BUNGIE_API_KEY
      // }
    })
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        try {
          const clans = await getMemberClans(token.sub)

          token.clans = clans.results.map(
            ({
              group: { groupId, name },
              member: {
                destinyUserInfo: { membershipId }
              }
            }) => ({
              groupId,
              membershipId,
              name
            })
          )
        } catch {
          token.clans = []
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user.membershipId = token.sub
      session.user.clans = token.clans as any

      return session
    }
  },
  pages: {
    signIn: signInUrl,
    signOut: signOutUrl,
    // error: 'TODO: create page',
    verifyRequest: null,
    newUser: null
  }
})
