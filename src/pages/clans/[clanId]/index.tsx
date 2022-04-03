import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BreadcrumbJsonLd } from 'next-seo'
import { possessive } from '@helpers/grammar'
import { canonicalUrl } from '@helpers/urls'
import PageContainer, { LoadingPageContainer } from '@components/PageContainer'
import Clan, { ClanMeta } from '@components/Clan'

const ClanPage: React.FC = ({
  tense,
  name,
  motto,
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter()

  if (isFallback) return <LoadingPageContainer />

  const { kicker, url } = ClanMeta[tense]

  return (
    <PageContainer meta={meta}>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: kicker,
            item: canonicalUrl(url())
          },
          {
            position: 2,
            name,
            item: meta.canonical
          }
        ]}
      />
      <Clan tense={tense} name={name} motto={motto} />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tense = (params?.tense as string) || null
  const clanId = params?.clanId as string
  // TODO: Get from api
  const clan = {
    id: clanId,
    name: 'TODO: Clan name',
    motto: clanId
  }

  // TODO: Handle 404
  // if (!clan) {
  //   return { notFound: true }
  // }

  const { name } = clan
  const { kicker, url } = ClanMeta[tense]

  return {
    props: {
      ...clan,
      tense,
      meta: {
        canonical: canonicalUrl(url(clan.id)),
        title: [name, kicker].join(' | '),
        description: `${possessive(
          name
        )} progress battling their way to the top of the Destiny 2 clan leaderboard`
      }
    },
    revalidate: 60
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
