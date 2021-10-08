import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { Prose } from '@newhighsco/chipset'
import { getClan } from '@libs/bungie'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'

const ClanPage: React.FC = ({
  name,
  motto,
  meta = { title: 'Loading...' }
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter()

  return (
    <PageContainer meta={meta}>
      <Lockup heading={name} kicker={motto} align="center" reverse primary />
      <Prose>{isFallback ? 'loading' : 'cached'}</Prose>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params
  const { detail } = await getClan(id as string)

  if (!detail) {
    return { notFound: true }
  }

  const { name, motto = null } = detail

  return {
    props: {
      id,
      name,
      motto,
      meta: {
        title: `${name} | Clans`,
        description: `${name}'s progress battling their way to the top of the Destiny 2 clan leaderboard`
      }
    }
    // TODO: Not currently supported by Next on Netlify
    // revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Only load top clans
  const clans = [`123`, `234`, `345`]
  const paths = clans.map(id => ({
    params: { id }
  }))

  return { paths, fallback: true }
}

export default ClanPage
