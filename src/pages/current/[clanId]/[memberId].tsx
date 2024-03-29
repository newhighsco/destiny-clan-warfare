import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType
} from 'next'
import React from 'react'

import { getMemberLeaderboard } from '~libs/api'
import { Status } from '~libs/api/types'
import ClanMemberPage, {
  getStaticProps as memberStaticProps
} from '~pages/clans/[clanId]/[memberId]'

const CurrentMemberPage: React.FC = props => {
  return <ClanMemberPage {...props} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { props }: InferGetStaticPropsType<typeof memberStaticProps> =
    await memberStaticProps({
      params: { ...params, status: Status[Status.Running] }
    })

  return {
    props: { leaderboard: await getMemberLeaderboard(props.id), ...props },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Get clan members
  const members = []
  const paths = members.map(({ clanId, memberId }) => ({
    params: { clanId, memberId }
  }))

  return { paths, fallback: true }
}

export default CurrentMemberPage
