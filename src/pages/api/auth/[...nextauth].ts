import NextAuth from 'next-auth'
import BungieProvider from 'next-auth/providers/bungie'

import { signInUrl, signOutUrl } from '~helpers/urls'
import { getMemberClans } from '~libs/bungie'

export const authOptions = {
  providers: [
    BungieProvider({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET,
      authorization: { params: { scope: '' } },
      httpOptions: { headers: { 'X-API-Key': process.env.BUNGIE_API_KEY } },
      userinfo: {
        async request({ tokens, provider }) {
          return await fetch(
            'https://www.bungie.net/platform/User/GetMembershipsForCurrentUser',
            {
              headers: {
                ...provider.httpOptions.headers,
                authorization: `Bearer ${tokens.access_token}`
              }
            }
          ).then(async response => await response.json())
        }
      }
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
      session.user.clans = token.clans

      return session
    }
  },
  pages: {
    signIn: signInUrl,
    signOut: signOutUrl
    // error: 'TODO: create page',
  }
}

export default NextAuth(authOptions)
