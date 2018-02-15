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
  constructor (props) {
    super(props)

    this.state = {
      enrollmentOpen: false
    }
  }

  componentDidMount () {
    const enrollmentOpen = JSON.parse(localStorage.getItem('enrollmentOpen'))

    this.setState({ enrollmentOpen: enrollmentOpen })
  }

  render () {
    const { location } = this.props
    const { enrollmentOpen } = this.state
    const query = queryString.parse(location.search)
    const success = query.success ? JSON.parse(query.success.toLowerCase()) : true
    const message = query.message || ''
    const successful = success || (!success && message === constants.enrollment.existing)
    const closed = !success && message === constants.enrollment.closed
    const title = successful ? 'Thanks for enrolling' : (closed ? 'Enrollment closed' : 'Enrollment failed')
    const description = `Clan enrollment for ${constants.meta.name}`

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Card center>
          {successful ? (
            <Fragment>
              <Lockup primary center kicker="Thanks for" heading="enrolling" />
              <Prose>
                <p>Great news, your clan is enrolled and ready to go in the current {constants.meta.name} event!</p>
                <p>Please allow <strong>60-90</strong> minutes for you clan and clan members to start appearing on the leaderboards.</p>
                <p>Why not take a look over our <Link to="/faqs">Frequently Asked Questions</Link> while you wait.</p>
              </Prose>
              <Button href="/current">View current leaderboard</Button>
            </Fragment>
          ) : (
            closed ? (
              <Fragment>
                <Lockup primary center kicker={title} heading="Sorry we're full" />
                <Prose>
                  <p>There is a limit on clan participation at this time so please check back each week as we accept more clans.</p>
                  <p>You can <a href={constants.social.twitter} target="_blank" rel="noopener noreferrer">follow us on Twitter</a>, or <a href={constants.social.discord} target="_blank" rel="noopener noreferrer">join our Discord server</a> to find out first when enrollment opens again.</p>
                </Prose>
                <Button href="/">Return to the homepage</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Lockup primary center kicker={title} heading="Please try again" />
                {message &&
                  <Prose>
                    <p>{message}</p>
                  </Prose>
                }
                {enrollmentOpen &&
                  <Button href="/#enroll">Enroll your clan today</Button>
                }
              </Fragment>
            )
          )}
        </Card>
      </PageContainer>
    )
  }
}

ThanksPage.propTypes = {
  location: PropTypes.object
}

export default ThanksPage
