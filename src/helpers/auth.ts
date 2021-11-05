import { DefaultSession } from 'next-auth'
import { GroupUserInfoCard, GroupV2 } from 'bungie-api-ts/groupv2'

export type SessionClan = Pick<GroupV2, 'groupId' | 'name'> &
  Pick<GroupUserInfoCard, 'membershipId'>

export type Session = DefaultSession & {
  user: {
    membershipId: string
    clans?: Array<SessionClan>
  }
}
