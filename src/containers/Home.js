import React from 'react'
import { useRouteData } from 'react-static'
import Home from '../components/page/home/Home'

function HomeContainer() {
  return <Home {...useRouteData()} />
}

export default HomeContainer
