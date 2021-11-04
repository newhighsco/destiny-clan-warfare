import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd, EventJsonLd } from 'next-seo'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import { getEvent, getEvents } from '@libs/api'
import { Button, Card, Prose } from '@newhighsco/chipset'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import config from '@config'
import Timer from '@components/Timer'

enum EventKicker {
  Current = 'Current event',
  Past = 'Past event',
  Future = 'Upcoming event'
}

const EventPage: React.FC = ({
  kicker,
  name,
  description,
  startDate,
  endDate,
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
      <Lockup kicker={kicker} align="center" highlight />
      <Card heading={<Lockup heading={name} align="center" />} align="center">
        <Timer start={startDate} end={endDate} />
        <Prose html={description} />
      </Card>
      <Button.Group>
        <Link href={eventUrl()} passHref>
          <Button>View all events</Button>
        </Link>
      </Button.Group>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { eventId } = params
  const event = await getEvent(eventId)
  const kicker = EventKicker[event.tense]

  return {
    props: {
      ...event,
      kicker,
      meta: {
        canonical: canonicalUrl(eventUrl(eventId as string)),
        title: `${event.name} | ${kicker}`,
        description: event.description
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getEvents()
  const paths = events.map(({ eventId }) => ({
    params: { eventId }
  }))

  return { paths, fallback: false }
}

export default EventPage
