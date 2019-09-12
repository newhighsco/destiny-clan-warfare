import React from 'react'
import { useRouteData } from 'react-static'
import PageClanOverall from '../../components/page/clan/Overall'

function ClanOverallContainer() {
  return <PageClanOverall {...useRouteData()} />
}

export default ClanOverallContainer
