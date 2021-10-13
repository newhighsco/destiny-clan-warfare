import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { BreadcrumbJsonLd } from 'next-seo'
import { canonicalUrl, clanUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'

const ClanMemberPage: React.FC = ({
  name,
  clan,
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
        primary
      />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { clanId, memberId } = params

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
        canonical: canonicalUrl(clanUrl(clanId as string, memberId as string)),
        title: `${name} [${clan.tag}] | Members`,
        description: 'TBC'
      }
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

export default ClanMemberPage
