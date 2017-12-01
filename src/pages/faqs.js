import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'

class FaqsPage extends Component {
  render () {
    return (
      <PageContainer>
        <Helmet>
          <title>FAQs</title>
          <meta name="description" content="Frequently asked questions about Destiny Clan Warfare" />
        </Helmet>
        <div className="temp">
          <p>FAQs</p>
        </div>
      </PageContainer>
    )
  }
}

export default FaqsPage

export const data = {
  layout: 'content'
}
