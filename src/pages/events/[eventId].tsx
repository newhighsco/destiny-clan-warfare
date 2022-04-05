import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { BreadcrumbJsonLd, EventJsonLd } from 'next-seo'
import { canonicalUrl, CURRENT_TENSE, eventUrl } from '@helpers/urls'
import { getEvent, getEvents } from '@libs/api'
import config from '@config'
import Event, { EventKicker } from '@components/Event'
import PageContainer from '@components/PageContainer'

const EventPage: React.FC = ({
  id,
  tense,
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
          {
            position: 1,
            name: 'Events',
            item: canonicalUrl(eventUrl())
          },
          {
            position: 2,
            name,
            item: meta.canonical
          }
        ]}
      />
      <Event
        id={id}
        tense={tense}
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
  const event = await getEvent(parseInt(eventId))

  return {
    props: {
      ...event,
      meta: {
        canonical: canonicalUrl(eventUrl(event.tense, event.id)),
        title: [event.name, EventKicker[event.tense]].join(' | '),
        description: event.description
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = (await getEvents())?.filter(
    ({ tense }) => tense !== CURRENT_TENSE
  )
  const paths = events.map(({ id }) => ({
    params: { eventId: `${id}` }
  }))

  return { paths, fallback: false }
}

export default EventPage
