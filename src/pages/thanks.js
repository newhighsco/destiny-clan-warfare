import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Button } from '../components/button/Button'
import Prose from '../components/prose/Prose'

const queryString = require('query-string')
const constants = require('../utils/constants')

class ThanksPage extends Component {
  render () {
    const { data, location } = this.props
    const query = queryString.parse(location.search)
    const success = query.success ? JSON.parse(query.success.toLowerCase()) : true
    const message = query.message || ''
    const title = success ? 'Thanks for enrolling' : 'Enrollment failed'
    const description = `Thanks for enrolling your clan in ${constants.meta.name}`

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Card className="text-center">
          {success ? (
            <Fragment>
              <Lockup primary center kicker="Thanks for" heading="Enrolling" />
              <Prose>
                <p>Please allow <strong>60-90</strong> minutes for you clan and clan members to start appearing on the leaderboards</p>
                <p>Why not take a look over our <Link to="/faqs">Frequently Asked Questions</Link> while you wait</p>
              </Prose>
              <Button href="/current">View current leaderboard</Button>
            </Fragment>
          ) : (
            <Fragment>
              <Lockup primary center kicker="Enrollment failed" heading="Please try again later" />
              {message ? (
                <Prose>
                  <p>{message}</p>
                </Prose>
              ) : (
                <Button href="/#enroll">Enroll your clan today</Button>
              )}
            </Fragment>
          )}
        </Card>
      </PageContainer>
    )
  }
}

ThanksPage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object
}

export default ThanksPage

export const pageQuery = graphql`
  query ThanksPageQuery {
    apiStatus {
      bungieCode
    }
  }
`
