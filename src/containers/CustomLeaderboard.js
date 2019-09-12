import React from 'react'
import { useRouteData } from 'react-static'
import PageCustomLeaderboard from '../components/page/custom-leaderboard/CustomLeaderboard'

function CustomLeaderboardContainer() {
  return <PageCustomLeaderboard {...useRouteData()} />
}

export default CustomLeaderboardContainer
