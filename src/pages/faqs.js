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
        <Card className="text-center">
          <Lockup primary center kicker="Frequently asked" heading="Questions" />
          <div className="temp">
            <p>FAQs</p>
          </div>
        </Card>
      </PageContainer>
    )
  }
}

export default FaqsPage

export const data = {
  layout: 'content'
}
