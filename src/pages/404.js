import React, { Component } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import HoldingPage from '../components/holding-page/HoldingPage'
import { Logo } from '../components/logo/Logo'

class NotFoundPage extends Component {
  render () {
    const title = 'Page not found'
    const description = 'Sorry, this page could not be found'

    return (
      <HoldingPage>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex,nofollow" />
          <meta name="og:title" content={title} />
          <meta name="og:description" content={description} />
        </Helmet>
        <Link to="/">
          <Logo />
        </Link>
      </HoldingPage>
    )
  }
}

export default NotFoundPage
