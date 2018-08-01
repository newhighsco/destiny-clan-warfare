import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import HoldingPage from '../holding-page/HoldingPage'
import { Logo } from '../logo/Logo'

const meta = {
  title: 'Page not found',
  description: 'Sorry, this page could not be found'
}

class NotFound extends PureComponent {
  render () {
    return (
      <HoldingPage meta={meta}>
        <Link to="/">
          <Logo />
        </Link>
      </HoldingPage>
    )
  }
}

export default NotFound
