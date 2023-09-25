import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType
} from 'next'
import React from 'react'

import { getClanLeaderboard, getEvents } from '~libs/api'
import { Status } from '~libs/api/types'
import ClanPage, {
  getStaticProps as clanStaticProps
} from '~pages/clans/[clanId]'

const CurrentClanPage: React.FC = props => {
  return <ClanPage {...props} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const events = await getEvents()
  const currentEvent = events.find(
    ({ status }) => status === Status[Status.Running]
  )

  if (!currentEvent) {
    return { notFound: true }
  }

  const { props }: InferGetStaticPropsType<typeof clanStaticProps> =
    await clanStaticProps({
      params: { ...params, status: Status[Status.Running] }
    })

  return {
    props: {
      ...props,
      leaderboard: await getClanLeaderboard(currentEvent.id, props.id),
      description: null
    },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Only load top clans
  const clans = []
  const paths = clans.map(clanId => ({ params: { clanId } }))

  return { paths, fallback: true }
}

export default CurrentClanPage
