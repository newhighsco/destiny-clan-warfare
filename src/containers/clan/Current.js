import React from 'react'
import { useRouteData } from 'react-static'
import ClanCurrent from '../../components/page/clan/Current'

function ClanCurrentContainer() {
  return <ClanCurrent {...useRouteData()} />
}

export default ClanCurrentContainer
