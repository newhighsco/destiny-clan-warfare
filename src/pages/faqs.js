import React, { Component } from 'react'
import PageContainer from '../components/page-container/PageContainer'

class FaqsPage extends Component {
  render () {
    return (
      <PageContainer>
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
