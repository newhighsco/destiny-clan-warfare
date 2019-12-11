import React from 'react'
import { Redirect } from '@reach/router'
import SupportUs from '../components/page/support-us/SupportUs'

const urlBuilder = require('../utils/url-builder')

function SupportUsPage() {
  const enableSponsorship = JSON.parse(process.env.ENABLE_SPONSORSHIP || true)

  if (!enableSponsorship) return <Redirect to={urlBuilder.rootUrl} />

  return <SupportUs />
}

export default SupportUsPage
