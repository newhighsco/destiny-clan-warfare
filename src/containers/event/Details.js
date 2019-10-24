import React, { useState, useEffect } from 'react'
import { useRouteData, prefetch } from 'react-static'
import EventDetails from '../../components/page/event/Details'

const urlBuilder = require('../../utils/url-builder')

function EventDetailsContainer() {
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

    const { event } = data

    if (event.isCurrent) {
      fetchData()
    }
  }, [])

  return <EventDetails {...data} />
}

export default EventDetailsContainer
