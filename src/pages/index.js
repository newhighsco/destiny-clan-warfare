import React, { Component } from 'react'
import PageContainer from '../components/PageContainer/PageContainer'
import Lockup from '../components/Lockup/Lockup'

class IndexPage extends Component {
  render () {
    return (
      <PageContainer>
        <Lockup kicker="Beta site" heading="Coming soon" />
      </PageContainer>
    )
  }
}

export default IndexPage

export const data = {
  layout: 'content'
}
