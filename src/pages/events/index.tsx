import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import config from '@config'
import { getEvents } from '@libs/api'
import { EventsLeaderboardRow } from '@libs/api/types'
import { EventKicker } from '@components/Event'
import Leaderboard from '@components/Leaderboard'

const EventListingPage: React.FC = ({
  events
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const meta = {
    canonical: canonicalUrl(eventUrl()),
    title: 'Events',
    description: `All upcoming, current, and, past ${config.name} events`
  }

  return (
    <PageContainer meta={meta}>
      <Lockup kicker="All" heading="events" align="center" highlight />
      <Leaderboard
        rows={events.map(({ id, name, endDate, status }) => ({
          id,
          name: [name, EventKicker[status]].join(' - '),
          lastUpdated: endDate
        }))}
        setHref={({ id, status }: EventsLeaderboardRow) => eventUrl(status, id)}
      />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      events: await getEvents()
    }
  }
}

export default EventListingPage
