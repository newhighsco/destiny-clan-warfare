import { DefaultSession } from 'next-auth'
import { GroupV2Card } from 'bungie-api-ts/groupv2'

export type Session = DefaultSession & {
  user: {
    membershipId: string
    clans?: Array<GroupV2Card>
  }
}
