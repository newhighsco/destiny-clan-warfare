import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { SmartLink } from '@newhighsco/chipset'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import config from '@config'
import { getEvents } from '@libs/api'
import { EventKicker } from '@components/Event'

const EventListingPage: React.FC = ({
  events,
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageContainer meta={meta}>
      <Lockup kicker="All" heading="events" align="center" highlight />
      {!!events.length && (
        <ul>
          {events.map(({ id, name, tense }) => (
            <li key={id}>
              <Link href={eventUrl(tense, id)} passHref>
                <SmartLink>
                  {name} - {EventKicker[tense]}
                </SmartLink>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      events: await getEvents(),
      meta: {
        canonical: canonicalUrl(eventUrl()),
        title: 'Events',
        description: `All upcoming, current, and, past ${config.name} events`
      }
    }
  }
}

export default EventListingPage
