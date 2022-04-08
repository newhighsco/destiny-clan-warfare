import React from 'react'
import { GetStaticProps } from 'next'
import EventPage, {
  getStaticProps as eventStaticProps
} from '@pages/events/[eventId]'

const CurrentEventPage: React.FC = props => {
  return <EventPage {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Get from API
  const eventId = 2

  if (!eventId) {
    return { notFound: true }
  }

  return await eventStaticProps({ params: { eventId: `${eventId}` } })
}

export default CurrentEventPage
