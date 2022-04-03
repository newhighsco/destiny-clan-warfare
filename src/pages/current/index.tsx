import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import EventPage, {
  getStaticProps as eventStaticProps
} from '@pages/events/[eventId]'
import { getCurrentEvent } from '@libs/api'

const CurrentEventPage: React.FC = props => {
  return <EventPage {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  const { currentEventId, leaderboard } = await getCurrentEvent()

  if (!currentEventId) {
    return { notFound: true }
  }

  const { props }: InferGetStaticPropsType<typeof eventStaticProps> =
    await eventStaticProps({
      params: { eventId: currentEventId }
    })

  return {
    props: {
      ...props,
      leaderboard
    },
    revalidate: 60
  }
}

export default CurrentEventPage
