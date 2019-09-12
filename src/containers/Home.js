import React from 'react'
import { useRouteData } from 'react-static'
import PageHome from '../components/page/home/Home'

function HomeContainer() {
  return <PageHome {...useRouteData()} />
}

export default HomeContainer
