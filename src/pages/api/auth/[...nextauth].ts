import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { Session } from '@helpers/auth'
import { signInUrl, signOutUrl } from '@helpers/urls'
import { getMemberClans } from '@libs/bungie'
import { GroupV2Card } from 'bungie-api-ts/groupv2'

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
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    signingKey: process.env.NEXTAUTH_JWT_SIGNING_KEY
  },
  callbacks: {
    jwt: async (token, user, account) => {
      if (account) {
        const clans = await getMemberClans(account.id)

        token.clans = clans.results.map(({ group: { groupId, name } }) => ({
          groupId,
          name
        }))
      }

      return Promise.resolve(token)
    },
    session: async (session, token) => {
      const userSession = session as Session
      userSession.user.membershipId = token.sub as string
      userSession.user.clans = token.clans as Array<GroupV2Card>

      return Promise.resolve(userSession)
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
