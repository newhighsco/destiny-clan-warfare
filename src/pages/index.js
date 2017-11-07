import React, { Component } from 'react'
import Lockup from '../components/Lockup/Lockup'

class IndexPage extends Component {
  render () {
    return (
      <Lockup kicker="Beta site" heading="Coming soon" />
    )
  }
}

export default IndexPage

export const data = {
  layout: 'content'
}
