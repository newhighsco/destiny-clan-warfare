import React, { PureComponent } from 'react'
import HoldingPage from '../holding-page/HoldingPage'
import { Lockup } from '../lockup/Lockup'

const meta = {
  title: 'Loading...',
  description: 'Please be patient, this page is loading'
}

class Loading extends PureComponent {
  render() {
    return (
      <HoldingPage meta={meta} showBackground={false}>
        <Lockup heading={meta.title} />
      </HoldingPage>
    )
  }
}

export default Loading
