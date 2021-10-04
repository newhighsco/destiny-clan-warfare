import { HttpClientConfig } from 'bungie-api-ts/http'
import { getGroup, GroupResponse } from 'bungie-api-ts/groupv2'

const { BUNGIE_API_KEY } = process.env

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
        'x-api-key': BUNGIE_API_KEY,
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
