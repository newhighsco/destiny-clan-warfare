import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'

class FaqsPage extends Component {
  render () {
    return (
      <PageContainer>
        <Helmet>
          <title>FAQs</title>
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
