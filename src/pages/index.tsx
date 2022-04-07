import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { Button } from '@newhighsco/chipset'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import config from '@config'
import Event from '@components/Event'
import { getCurrentEvent, getEvent } from '@libs/api'

const { logo, name, socialLinks, title, url } = config

const HomePage: React.FC = ({
  currentEvent,
  previousEvent,
  nextEvent,
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let events = [
    <Event
      {...previousEvent}
      key={previousEvent?.id}
      summary
      kicker="Previous event"
    />,
    <Event {...nextEvent} key={nextEvent?.id} summary kicker="Next event" />
  ].filter(Boolean)

  if (!currentEvent && events.length > 1) {
    events = events.reverse()
  }

  return (
    <PageContainer meta={meta}>
      <SocialProfileJsonLd
        type="Organization"
        name={name}
        url={url}
        sameAs={[socialLinks.twitter]}
      />
      {logo?.bitmap && (
        <LogoJsonLd url={url} logo={canonicalUrl(logo.bitmap)} />
      )}
      <Event {...currentEvent} summary />
      {events.map(event => event)}
      <Button.Group>
        <Link href={eventUrl()} passHref prefetch={false}>
          <Button>View all events</Button>
        </Link>
      </Button.Group>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { eventId: currentEventId } = await getCurrentEvent()
  const currentEvent = await getEvent(currentEventId)
  // TODO: Get from API
  const previousEvent = null // await getEvent(3)
  const nextEvent = null // await getEvent(4)

  return {
    props: {
      currentEvent,
      previousEvent,
      nextEvent,
      meta: {
        canonical: canonicalUrl(),
        customTitle: true,
        title
      }
    }
  }
}

export default HomePage
