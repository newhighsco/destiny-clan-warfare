import React, { Fragment, useState, useEffect } from 'react'
import { Link } from '@reach/router'
import { OutboundLink } from 'react-ga-donottrack'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Button } from '../components/button/Button'
import Prose from '../components/prose/Prose'

const queryString = require('query-string')
const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

const meta = {
  description: `Clan enrollment for ${constants.meta.name}`,
  robots: 'noindex,nofollow'
}

function ThanksPage () {
  const [ enrollmentOpen, setEnrollmentOpen ] = useState(false)

  useEffect(() => {
    setEnrollmentOpen(JSON.parse(localStorage.getItem('enrollmentOpen')))
  })

  const query = (typeof location !== 'undefined') ? queryString.parse(location.search) : {}
  const success = query.success ? JSON.parse(query.success.toLowerCase()) : false
  const message = query.message || ''
  const successful = success || (!success && message === constants.enrollment.existing)
  const closed = !success && message === constants.enrollment.closed
  const optOut = !success && message === constants.enrollment.optOut

  meta.title = successful ? 'Thanks for enrolling' : (closed ? 'Enrollment closed' : 'Enrollment failed')

  return (
    <PageContainer meta={meta}>
      <Card center>
        {successful ? (
          <Fragment>
            <Lockup primary center kicker="Thanks for" heading="enrolling" />
            <Prose>
              <p>Great news, your clan is enrolled and ready to go in the current {constants.meta.name} event!</p>
              <p>Please allow <strong>60-90</strong> minutes for you clan and clan members to start appearing on the leaderboards.</p>
              <p>Why not take a look over our <Link to="/faqs/">Frequently Asked Questions</Link> while you wait.</p>
            </Prose>
            <Button href={urlBuilder.currentEventRootUrl}>View current leaderboard</Button>
          </Fragment>
        ) : (
          closed ? (
            <Fragment>
              <Lockup primary center kicker={meta.title} heading="Sorry we're full" />
              <Prose>
                <p>There is a limit on clan participation at this time so please check back each week as we accept more clans.</p>
                <p><OutboundLink to={constants.social.twitter} eventLabel={constants.social.twitter} target="_blank" rel="noopener noreferrer">Follow us on Twitter</OutboundLink> to find out first when it reopens.</p>
              </Prose>
              <Button href="/">Return to the homepage</Button>
            </Fragment>
          ) : (
            optOut ? (
              <Fragment>
                <Lockup primary center kicker={meta.title} heading="Can't enroll clan" />
                <Prose>
                  <p>This clan has opted-out of participating in {constants.meta.name}, and therefore cannot be enrolled.</p>
                  <p>If you thing this is a mistake you can <OutboundLink to={constants.social.twitter} eventLabel={constants.social.twitter} target="_blank" rel="noopener noreferrer">message us on Twitter</OutboundLink> to discuss the issue with us further.</p>
                </Prose>
                <Button href="/">Return to the homepage</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Lockup primary center kicker={meta.title} heading="Please try again" />
                {message &&
                  <Prose>
                    <p>{message}</p>
                  </Prose>
                }
                {enrollmentOpen ? (
                  <Button href={`/${constants.prefix.hash}${constants.prefix.enroll}`}>Enroll your clan today</Button>
                ) : (
                  <Button href="/">Return to the homepage</Button>
                )}
              </Fragment>
            )
          )
        )}
      </Card>
    </PageContainer>
  )
}

export default ThanksPage
