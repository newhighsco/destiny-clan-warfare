import React, { Component } from 'react'
import { Link } from 'react-static'
import Helmet from 'react-helmet'
import HoldingPage from '../components/holding-page/HoldingPage'
import { Logo } from '../components/logo/Logo'

class NotFoundPage extends Component {
  constructor (props) {
    super()

    this.state = { active: false }
  }

  componentDidMount () {
    this.setState({
      active: true
    })
  }

  render () {
    const { active } = this.state

    if (!active) return null

    const title = 'Page not found'
    const description = 'Sorry, this page could not be found'

    return (
      <HoldingPage>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex,nofollow" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
        <Link to="/">
          <Logo />
        </Link>
      </HoldingPage>
    )
  }
}

export default NotFoundPage
