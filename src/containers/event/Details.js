import React from 'react'
import { useRouteData } from 'react-static'
import PageEventDetails from '../../components/page/event/Details'

function EventDetailsContainer() {
  return <PageEventDetails {...useRouteData()} />
}

export default EventDetailsContainer
