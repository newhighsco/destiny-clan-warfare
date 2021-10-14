import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import config from '@config'

const EventListingPage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageContainer meta={meta}>
      <Lockup kicker="All" heading="events" align="center" highlight />
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        canonical: canonicalUrl(eventUrl()),
        title: 'Events',
        description: `All upcoming, current, and, past ${config.name} events`
      }
    }
  }
}

export default EventListingPage
