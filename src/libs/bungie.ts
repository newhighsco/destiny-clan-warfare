import { HttpClientConfig } from 'bungie-api-ts/http'
import {
  getGroup,
  getGroupsForMember,
  GetGroupsForMemberResponse,
  GroupResponse
} from 'bungie-api-ts/groupv2'

const http = (accessToken?: string) => async (config: HttpClientConfig) => {
  try {
    const params = new URLSearchParams()

    Object.entries(config?.params ?? []).forEach(([key, value]) =>
      params.append(key, value as string)
    )

    const url = `${config.url}?${params.toString()}`

    const response = await fetch(url, {
      method: config.method,
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` })
      },
      credentials: 'include'
    })

    return await response.json()
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const getClan = async (groupId: string): Promise<GroupResponse> => {
  return await getGroup(http(), { groupId }).then(res => res.Response)
}

export const getMemberClans = async (
  membershipId: string
): Promise<GetGroupsForMemberResponse> => {
  return await getGroupsForMember(http(), {
    filter: 0,
    groupType: 1,
    membershipId,
    membershipType: 254
  }).then(res => res.Response)
}
