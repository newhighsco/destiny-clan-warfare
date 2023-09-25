import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType
} from 'next'
import { useRouter } from 'next/router'
import { BreadcrumbJsonLd } from 'next-seo'
import React from 'react'

import Member, { MemberMeta } from '~components/Member'
import PageContainer, { LoadingPageContainer } from '~components/PageContainer'
import { possessive } from '~helpers/grammar'
import { canonicalUrl, currentUrl } from '~helpers/urls'
import { getClan, getMember } from '~libs/api'
import { Status } from '~libs/api/types'

const ClanMemberPage: React.FC = ({
  id,
  status,
  name,
  avatar,
  clan,
  leaderboard
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter()

  if (isFallback) return <LoadingPageContainer />

  const isCurrent = status === Status[Status.Running]
  const { kicker, url, description } = MemberMeta[status]
  const meta = {
    canonical: canonicalUrl(url(clan.id, id)),
    title: [`${name} [${clan.tag}]`, kicker].join(' | '),
    description: [possessive(name), description].join(' ')
  }
  const breadcrumbs = [
    isCurrent && { name: kicker, item: canonicalUrl(currentUrl()) },
    { name: clan.name, item: canonicalUrl(url(clan.id)) },
    { name, item: meta.canonical }
  ].filter(Boolean)

  return (
    <PageContainer meta={meta}>
      <BreadcrumbJsonLd
        itemListElements={breadcrumbs.map((breadcrumb, index) => ({
          position: index + 1,
          ...breadcrumb
        }))}
      />
      <Member
        id={id}
        status={status}
        name={name}
        avatar={avatar}
        clan={clan}
        leaderboard={leaderboard}
      />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const status = params?.status || null
  const clanId = params?.clanId.toString()
  const memberId = params?.memberId.toString()
  const clan = await getClan(parseInt(clanId))
  const member = await getMember(parseInt(memberId))

  // TODO: Handle 404
  // if (!member) {
  //   return { notFound: true }
  // }

  return { props: { ...member, clan, status }, revalidate: 60 }
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
