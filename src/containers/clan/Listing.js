import React from 'react'
import { useRouteData } from 'react-static'
import ClanListing from '../../components/page/clan/Listing'

function ClanListingContainer() {
  return <ClanListing {...useRouteData()} />
}

export default ClanListingContainer
