import React, { PureComponent } from 'react'
import HoldingPage from '../holding-page/HoldingPage'
import { Logo } from '../logo/Logo'

const meta = {
  title: 'Loading'
}

class Loading extends PureComponent {
  render () {
    return (
      <HoldingPage meta={meta}>
        <Logo />
      </HoldingPage>
    )
  }
}

export default Loading
