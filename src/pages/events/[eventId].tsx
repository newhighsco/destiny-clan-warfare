import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { BreadcrumbJsonLd, EventJsonLd } from 'next-seo'
import Event, { EventKicker } from '@components/Event'
import PageContainer from '@components/PageContainer'
import config from '@config'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import { getEvent, getEventLeaderboard, getEvents } from '@libs/api'
import { Status } from '@libs/api/types'

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
  leaderboard,
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { openGraphImage, name: siteName } = config

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
  const eventId = params?.eventId as string
  const event = await getEvent(eventId)

  if (!event) {
    return { notFound: true }
  }

  const { id, status, name, description } = event

  return {
    props: {
      ...event,
      leaderboard: await getEventLeaderboard(id, status),
      meta: {
        canonical: canonicalUrl(eventUrl(status, id)),
        title: [name, EventKicker[status]].join(' | '),
        description
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = (await getEvents())?.filter(
    ({ status }) => status !== Status[Status.Running]
  )
  const paths = events.map(({ id }) => ({ params: { eventId: `${id}` } }))

  return { paths, fallback: false }
}

export default EventPage
