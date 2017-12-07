import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'

class ThanksPage extends Component {
  render () {
    return (
      <PageContainer>
        <Helmet>
          <title>Thanks</title>
          <meta name="description" content="Thanks for enrolling your clan in Destiny Clan Warfare" />
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Card className="text-center">
          <Lockup primary center kicker="Thanks for" heading="Enrolling" />
          <div className="temp">
            <p>Thanks copy</p>
          </div>
        </Card>
      </PageContainer>
    )
  }
}

export default ThanksPage

export const data = {
  layout: 'content'
}
