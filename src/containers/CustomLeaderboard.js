import React from 'react'
import { useRouteData } from 'react-static'
import CustomLeaderboard from '../components/page/custom-leaderboard/CustomLeaderboard'

function CustomLeaderboardContainer() {
  return <CustomLeaderboard {...useRouteData()} />
}

export default CustomLeaderboardContainer
