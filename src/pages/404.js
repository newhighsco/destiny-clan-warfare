import React, { Component } from 'react'
import { Link, Head } from 'react-static'
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
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex,nofollow" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Link to="/">
          <Logo />
        </Link>
      </HoldingPage>
    )
  }
}

export default NotFoundPage
