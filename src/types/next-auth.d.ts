import { type GroupUserInfoCard, type GroupV2 } from 'bungie-api-ts/groupv2'
import { type DefaultSession } from 'next-auth'

type Clan = Pick<GroupV2, 'groupId' | 'name'> &
  Pick<GroupUserInfoCard, 'membershipId'>

declare module 'next-auth' {
  interface Session {
    user: {
      membershipId: string
      clans?: Clan[]
    } & DefaultSession['user']
  }
}
