import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import ClanPage, {
  getStaticProps as clanStaticProps
} from '@pages/clans/[clanId]'
import { CURRENT_TENSE } from '@helpers/urls'

const CurrentClanPage: React.FC = props => {
  return <ClanPage {...props} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { props }: InferGetStaticPropsType<typeof clanStaticProps> =
    await clanStaticProps({ params: { ...params, tense: CURRENT_TENSE } })

  return {
    props: {
      ...props
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Only load top clans
  const clans = Array.from(Array(5).keys()).map(key => `${key}`)
  const paths = clans.map(clanId => ({
    params: { clanId }
  }))

  return { paths, fallback: true }
}

export default CurrentClanPage
