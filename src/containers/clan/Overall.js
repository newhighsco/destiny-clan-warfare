import React from 'react'
import { useRouteData } from 'react-static'
import ClanOverall from '../../components/page/clan/Overall'

function ClanOverallContainer() {
  return <ClanOverall {...useRouteData()} />
}

export default ClanOverallContainer
