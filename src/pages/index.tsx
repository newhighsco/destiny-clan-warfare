import { Button } from '@newhighsco/chipset'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import React from 'react'

import Event from '~components/Event'
import PageContainer from '~components/PageContainer'
import config from '~config'
import { canonicalUrl, eventUrl } from '~helpers/urls'
import { getEvent } from '~libs/api'

const { logo, name, socialLinks, title, url } = config

const HomePage: React.FC = ({
  currentEvent,
  previousEvent,
  nextEvent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let events = [
    previousEvent && (
      <Event
        {...previousEvent}
        key={previousEvent?.id}
        summary
        kicker="Previous event"
      />
    ),
    nextEvent && (
      <Event {...nextEvent} key={nextEvent?.id} summary kicker="Next event" />
    )
  ].filter(Boolean)

  if (!currentEvent && events.length > 1) {
    events = events.reverse()
  }

  const meta = {
    canonical: canonicalUrl(),
    customTitle: true,
    title
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
        <Link href={eventUrl()} passHref legacyBehavior prefetch={false}>
          <Button>View all events</Button>
        </Link>
      </Button.Group>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Get from API
  const currentEvent = await getEvent('2')
  const previousEvent = await getEvent('1')
  const nextEvent = null // await getEvent('4')

  return {
    props: {
      currentEvent,
      previousEvent,
      nextEvent
    }
  }
}

export default HomePage
