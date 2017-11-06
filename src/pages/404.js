import React from 'react'
import Helmet from 'react-helmet'
import HoldingPage from '../components/HoldingPage/HoldingPage'
import { Logo } from '../components/Logo/Logo'

const NotFoundPage = () => (
  <HoldingPage>
    <Helmet
      meta={[
        { name: 'robots', content: 'noindex,nofollow' }
      ]}
    />
    <Logo />
  </HoldingPage>
)

export default NotFoundPage
