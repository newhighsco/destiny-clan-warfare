import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Button } from '../components/button/Button'

const queryString = require('query-string')
const constants = require('../utils/constants')

class ThanksPage extends Component {
  render () {
    const { location } = this.props
    const query = queryString.parse(location.search)
    const success = query.success ? JSON.parse(query.success.toLowerCase()) : true
    const message = query.message || ''
    const title = success ? 'Thanks for enrolling' : 'Enrollment failed'
    const description = `Thanks for enrolling your clan in ${constants.name}`

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Card className="text-center">
          {success ? ([
            <Lockup key="lockup" primary center kicker="Thanks for" heading="Enrolling" />,
            <p key="prose">Please allow <strong>60-90</strong> minutes for you clan and clan members to start appearing on the leaderboards</p>,
            <Button key="button" href="/current">View current leaderboard</Button>
          ]) : ([
            <Lockup key="lockup" primary center kicker="Enrollment failed" heading="Please try again" />,
            message &&
              <p key="prose">{message}</p>,
            <Button key="button" href="/#enroll">Enroll your clan today</Button>
          ])}
        </Card>
      </PageContainer>
    )
  }
}

ThanksPage.propTypes = {
  location: PropTypes.object
}

export default ThanksPage

export const data = {
  layout: 'content'
}
