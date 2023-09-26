import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType
} from 'next'
import { BreadcrumbJsonLd, EventJsonLd } from 'next-seo'
import React from 'react'

import Event, { EventKicker } from '~components/Event'
import PageContainer from '~components/PageContainer'
import config from '~config'
import { canonicalUrl, eventUrl } from '~helpers/urls'
import { getEvent, getEventLeaderboard, getEvents } from '~libs/api'

const EventPage: React.FC = ({
  id,
  status,
  name,
  description,
  startDate,
  endDate,
  modifiers,
  stats,
  statsGamesThreshold,
  medals,
  leaderboard
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { openGraphImage, name: siteName } = config
  const meta = {
    canonical: canonicalUrl(eventUrl({ status, id })),
    title: [name, EventKicker[status]].join(' | '),
    description
  }

  return (
    <PageContainer meta={meta}>
      <EventJsonLd
        url={meta.canonical}
        name={name}
        description={description}
        startDate={startDate}
        endDate={endDate}
        images={[openGraphImage]}
        location={{
          name: siteName,
          sameAs: canonicalUrl(),
          address: {
            streetAddress: '',
            addressLocality: '',
            postalCode: '',
            addressCountry: ''
          }
        }}
        offers={{
          price: '0',
          priceCurrency: '',
          url: meta.canonical,
          seller: { name: siteName }
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'Events', item: canonicalUrl(eventUrl()) },
          { position: 2, name, item: meta.canonical }
        ]}
      />
      <Event
        id={id}
        status={status}
        name={name}
        description={description}
        startDate={startDate}
        endDate={endDate}
        modifiers={modifiers}
        stats={stats}
        statsGamesThreshold={statsGamesThreshold}
        medals={medals}
        leaderboard={leaderboard}
      />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const event = await getEvent(params?.eventId.toString())

  if (!event) {
    return { notFound: true }
  }

  const leaderboard = await getEventLeaderboard(event)

  return { props: { ...event, leaderboard }, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getEvents()
  const paths = events.map(({ id }) => ({ params: { eventId: id.toString() } }))

  return { paths, fallback: false }
}

export default EventPage
