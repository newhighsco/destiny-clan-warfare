import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { BreadcrumbJsonLd, EventJsonLd } from 'next-seo'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import config from '@config'

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
      <Lockup kicker={kicker} heading={name} align="center" highlight />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { eventId } = params

  // TODO: Get data
  const name = 'TBC name'
  const description = 'TBC description'
  const startDate = new Date()
  const endDate = new Date()
  const kicker = 'TBC kicker'

  return {
    props: {
      kicker,
      name,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      meta: {
        canonical: canonicalUrl(eventUrl(eventId as string)),
        title: `${name} | ${kicker}`,
        description
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Get all events
  const events = Array.from(Array(50).keys()).map(key => `${key}`)
  const paths = events.map(eventId => ({
    params: { eventId }
  }))

  return { paths, fallback: false }
}

export default EventPage
