import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'

class FaqsPage extends Component {
  render () {
    return (
      <PageContainer>
        <Helmet>
          <title>FAQs</title>
          <meta name="description" content="Frequently asked questions about Destiny Clan Warfare" />
        </Helmet>
        <Card>
          <Lockup primary center kicker="Frequently asked" heading="Questions" />
          <p>FAQs</p>
        </Card>
      </PageContainer>
    )
  }
}

export default FaqsPage

export const data = {
  layout: 'content'
}
