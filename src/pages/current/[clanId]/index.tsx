import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import ClanPage, {
  getStaticProps as clanStaticProps
} from '@pages/clans/[clanId]'
import { getClanLeaderboard } from '@libs/api'
import { Status } from '@libs/api/types'

const CurrentClanPage: React.FC = props => {
  return <ClanPage {...props} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO: Get from API
  const eventId = 2

  if (!eventId) {
    return { notFound: true }
  }

  const { props }: InferGetStaticPropsType<typeof clanStaticProps> =
    await clanStaticProps({
      params: { ...params, status: Status[Status.Running] }
    })

  return {
    props: {
      ...props,
      leaderboard: await getClanLeaderboard(eventId, props.id),
      description: null
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Only load top clans
  const clans = []
  const paths = clans.map(clanId => ({ params: { clanId } }))

  return { paths, fallback: true }
}

export default CurrentClanPage
