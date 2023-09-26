import { type GetStaticProps } from 'next'
import React from 'react'

import { isCurrentEvent } from '~helpers/events'
import { getEvents } from '~libs/api'
import EventPage, {
  getStaticProps as eventStaticProps
} from '~pages/events/[eventId]'

const CurrentEventPage: React.FC = props => {
  return <EventPage {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await getEvents()
  const currentEvent = events.find(({ status }) => isCurrentEvent(status))

  if (!currentEvent) {
    return { notFound: true }
  }

  return await eventStaticProps({
    params: { eventId: currentEvent.id.toString() }
  })
}

export default CurrentEventPage
