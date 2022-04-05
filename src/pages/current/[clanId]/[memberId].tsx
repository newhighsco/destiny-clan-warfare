import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import ClanMemberPage, {
  getStaticProps as memberStaticProps
} from '@pages/clans/[clanId]/[memberId]'
import { CURRENT_TENSE } from '@helpers/urls'

const CurrentMemberPage: React.FC = props => {
  return <ClanMemberPage {...props} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { props }: InferGetStaticPropsType<typeof memberStaticProps> =
    await memberStaticProps({ params: { ...params, tense: CURRENT_TENSE } })

  return {
    props: {
      ...props
    }
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
