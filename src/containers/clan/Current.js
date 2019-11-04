import React, { useState, useEffect } from 'react'
import { useRouteData, prefetch } from 'react-static'
import ClanCurrent from '../../components/page/clan/Current'

const urlBuilder = require('../../utils/url-builder')

function ClanCurrentContainer() {
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

    fetchData()
  }, [])

  return <ClanCurrent {...data} />
}

export default ClanCurrentContainer
