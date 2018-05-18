import React, { PureComponent } from 'react'
import { Head } from 'react-static'
import HoldingPage from '../holding-page/HoldingPage'
import { Logo } from '../logo/Logo'

class Loading extends PureComponent {
  render () {
    return (
      <HoldingPage>
        <Head>
          <title>Loading</title>
        </Head>
        <Logo />
      </HoldingPage>
    )
  }
}

export default Loading
