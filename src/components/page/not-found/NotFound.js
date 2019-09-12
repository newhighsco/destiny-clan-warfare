import React, { PureComponent } from 'react'
import HoldingPage from '../../holding-page/HoldingPage'
import SmartLink from '../../smart-link/SmartLink'
import { Logo } from '../../logo/Logo'

const meta = {
  title: 'Page not found',
  description: 'Sorry, this page could not be found',
  robots: 'noindex,nofollow'
}

const NotFound = class extends PureComponent {
  render() {
    return (
      <HoldingPage meta={meta}>
        <SmartLink href="/">
          <Logo />
        </SmartLink>
      </HoldingPage>
    )
  }
}

export default NotFound
