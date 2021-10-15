import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BreadcrumbJsonLd } from 'next-seo'
import { Prose } from '@newhighsco/chipset'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import { canonicalUrl, clanUrl } from '@helpers/urls'

const ClanPage: React.FC = ({
  name,
  motto,
  // TODO: Loading state
  meta = { title: 'Loading...' }
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter()

  return (
    <PageContainer meta={meta}>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Clans',
            item: canonicalUrl(clanUrl())
          },
          {
            position: 2,
            name,
            item: meta.canonical
          }
        ]}
      />
      <Lockup heading={name} kicker={motto} align="center" reverse highlight />
      <Prose>{isFallback ? 'loading' : 'cached'}</Prose>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { clanId } = params
  // TODO: Get from api
  const detail = {
    name: 'Avalanche UK',
    motto: 'TBC'
  }

  // TODO: Handle 404
  // if (!detail) {
  //   return { notFound: true }
  // }

  const { name, motto = null } = detail

  return {
    props: {
      name,
      motto,
      meta: {
        canonical: canonicalUrl(clanUrl(clanId as string)),
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
  const clans = Array.from(Array(5).keys()).map(key => `${key}`)
  const paths = clans.map(clanId => ({
    params: { clanId }
  }))

  return { paths, fallback: true }
}

export default ClanPage
