import React, { Component } from 'react'
import { Head } from 'react-static'
import HoldingPage from '../holding-page/HoldingPage'
import { Logo } from '../logo/Logo'

class Loading extends Component {
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
