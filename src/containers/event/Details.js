import React from 'react'
import { useRouteData } from 'react-static'
import EventDetails from '../../components/page/event/Details'

function EventDetailsContainer() {
  return <EventDetails {...useRouteData()} />
}

export default EventDetailsContainer
