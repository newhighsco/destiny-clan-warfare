import React from 'react'
import { useRouteData } from 'react-static'
import PageClanCurrent from '../../components/page/clan/Current'

function ClanCurrentContainer() {
  return <PageClanCurrent {...useRouteData()} />
}

export default ClanCurrentContainer
