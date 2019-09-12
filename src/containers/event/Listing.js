import React from 'react'
import { useRouteData } from 'react-static'
import PageEventListing from '../../components/page/event/Listing'

function EventListingContainer() {
  return <PageEventListing {...useRouteData()} />
}

export default EventListingContainer
