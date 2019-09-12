import React from 'react'
import { useRouteData } from 'react-static'
import PageClanListing from '../../components/page/clan/Listing'

function ClanListingContainer() {
  return <PageClanListing {...useRouteData()} />
}

export default ClanListingContainer
