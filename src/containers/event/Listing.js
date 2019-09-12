import React from 'react'
import { useRouteData } from 'react-static'
import EventListing from '../../components/page/event/Listing'

function EventListingContainer() {
  return <EventListing {...useRouteData()} />
}

export default EventListingContainer
