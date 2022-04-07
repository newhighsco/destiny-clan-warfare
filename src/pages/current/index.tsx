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
  const { eventId, leaderboard } = await getCurrentEvent()

  if (!eventId) {
    return { notFound: true }
  }

  const { props }: InferGetStaticPropsType<typeof eventStaticProps> =
    await eventStaticProps({
      params: { eventId: `${eventId}` }
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
