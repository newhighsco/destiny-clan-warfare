import React, { PureComponent } from 'react'
import { Head } from 'react-static'
import NProgress from 'nprogress'
import HoldingPage from '../holding-page/HoldingPage'
import { Logo } from '../logo/Logo'

class Loading extends PureComponent {
  render () {
    NProgress.start()

    return (
      <HoldingPage>
        <Head>
          <title>Loading</title>
          <meta httpEquiv="refresh" content="0" />
        </Head>
        <Logo />
      </HoldingPage>
    )
  }
}

export default Loading
