import React, { useState, useEffect } from 'react'
import { useRouteData, prefetch } from 'react-static'
import CustomLeaderboard from '../components/page/custom-leaderboard/CustomLeaderboard'

const urlBuilder = require('../utils/url-builder')

function CustomLeaderboardContainer() {
  const routeData = useRouteData()
  const [data, setData] = useState({
    ...routeData,
    apiStatus: {}
  })

  useEffect(() => {
    async function fetchData() {
      const { apiStatus } = await prefetch(urlBuilder.rootUrl, {
        type: 'data'
      })

      setData({
        ...routeData,
        apiStatus
      })
    }

    const { currentEventId } = data

    if (currentEventId) {
      fetchData()
    }
  }, [])

  return <CustomLeaderboard {...data} />
}

export default CustomLeaderboardContainer
