import React, { Component } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import HoldingPage from '../components/holding-page/HoldingPage'
import { Logo } from '../components/logo/Logo'

class NotFoundPage extends Component {
  render () {
    return (
      <HoldingPage>
        <Helmet>
          <title>Page not found</title>
          <meta name="description" content="Sorry, this page could not be found" />
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Link to="/">
          <Logo />
        </Link>
      </HoldingPage>
    )
  }
}

export default NotFoundPage
