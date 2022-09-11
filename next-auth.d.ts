import { DefaultSession } from 'next-auth'
import { GroupUserInfoCard, GroupV2 } from 'bungie-api-ts/groupv2'

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
