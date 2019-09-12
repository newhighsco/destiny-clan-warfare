import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../../../contexts/App'
import PageContainer from '../../page-container/PageContainer'
import Card from '../../card/Card'
import { Lockup } from '../../lockup/Lockup'
import { Button } from '../../button/Button'
import Prose from '../../prose/Prose'
import SmartLink from '../../smart-link/SmartLink'

const queryString = require('query-string')
const constants = require('../../../utils/constants')
const urlBuilder = require('../../../utils/url-builder')

const meta = {
  description: `Clan enrollment for ${constants.meta.name}`,
  robots: 'noindex,nofollow'
}

function Thanks({ search }) {
  const apiStatus = useContext(AppContext)
  const query = queryString.parse(search)
  const success = query.success
    ? JSON.parse(query.success.toLowerCase())
    : false
  const message = query.message || ''
  const successful =
    success || (!success && message === constants.enrollment.existing)
  const closed = !success && message === constants.enrollment.closed
  const optOut = !success && message === constants.enrollment.optOut

  meta.title = successful
    ? 'Thanks for enrolling'
    : closed
    ? 'Enrollment closed'
    : 'Enrollment failed'

  return (
    <PageContainer meta={meta}>
      <Card center>
        {successful ? (
          <Fragment>
            <Lockup primary center kicker="Thanks for" heading="enrolling" />
            <Prose>
              <p>
                Great news, your clan is enrolled and ready to go in the current{' '}
                {constants.meta.name} event!
              </p>
              <p>
                Please allow <strong>60-90</strong> minutes for you clan and
                clan members to start appearing on the leaderboards.
              </p>
              <p>
                Why not take a look over our{' '}
                <SmartLink href="/faqs/">Frequently Asked Questions</SmartLink>{' '}
                while you wait.
              </p>
            </Prose>
            <Button href={urlBuilder.currentEventRootUrl}>
              View current leaderboard
            </Button>
          </Fragment>
        ) : closed ? (
          <Fragment>
            <Lockup
              primary
              center
              kicker={meta.title}
              heading="Sorry we're full"
            />
            <Prose>
              <p>
                There is a limit on clan participation at this time so please
                check back each week as we accept more clans.
              </p>
              <p>
                <SmartLink href={constants.social.twitter} target="_blank">
                  Follow us on Twitter
                </SmartLink>{' '}
                to find out first when it reopens.
              </p>
            </Prose>
            <Button href="/">Return to the homepage</Button>
          </Fragment>
        ) : optOut ? (
          <Fragment>
            <Lockup
              primary
              center
              kicker={meta.title}
              heading="Can't enroll clan"
            />
            <Prose>
              <p>
                This clan has opted-out of participating in{' '}
                {constants.meta.name}, and therefore cannot be enrolled.
              </p>
              <p>
                If you thing this is a mistake you can{' '}
                <SmartLink href={constants.social.twitter} target="_blank">
                  message us on Twitter
                </SmartLink>{' '}
                to discuss the issue with us further.
              </p>
            </Prose>
            <Button href="/">Return to the homepage</Button>
          </Fragment>
        ) : (
          <Fragment>
            <Lockup
              primary
              center
              kicker={meta.title}
              heading="Please try again"
            />
            {message && (
              <Prose>
                <p>{message}</p>
              </Prose>
            )}
            {apiStatus && apiStatus.enrollmentOpen ? (
              <Button
                href={`/${constants.prefix.hash}${constants.prefix.enroll}`}
              >
                Enroll your clan today
              </Button>
            ) : (
              <Button href="/">Return to the homepage</Button>
            )}
          </Fragment>
        )}
      </Card>
    </PageContainer>
  )
}

Thanks.propTypes = {
  search: PropTypes.string
}

export default Thanks
