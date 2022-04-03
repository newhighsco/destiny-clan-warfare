import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { BreadcrumbJsonLd } from 'next-seo'
import { possessive } from '@helpers/grammar'
import { canonicalUrl, clanUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'

const ClanMemberPage: React.FC = ({
  name,
  clan,
  // TODO: Loading state
  meta = { title: 'Loading...' }
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const kicker = clan?.name
  const kickerHref = clanUrl(clan?.id)

  return (
    <PageContainer meta={meta}>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: kicker,
            item: canonicalUrl(kickerHref)
          },
          {
            position: 2,
            name,
            item: meta.canonical
          }
        ]}
      />
      <Lockup
        heading={name}
        kicker={kicker}
        kickerAttributes={{ href: kickerHref }}
        align="center"
        reverse
        highlight
      />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const clanId = params?.clanId as string
  const memberId = params?.memberId as string

  const data = {
    name: 'benedfit',
    id: memberId,
    avatar: 'https://www.bungie.net/img/profile/avatars/cc13.jpg',
    clan: {
      id: '1486166',
      name: 'Avalanche UK',
      tag: 'AVA'
    }
  }

  const { name, clan } = data

  return {
    props: {
      name,
      clan,
      meta: {
        canonical: canonicalUrl(clanUrl(clanId, memberId)),
        title: `${name} [${clan.tag}] | Members`,
        description: `${possessive(
          name
        )} progress in the war against other clans in Destiny 2`
      }
    },
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

export default ClanMemberPage
