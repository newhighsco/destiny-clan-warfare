import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../../page-container/PageContainer'
import { Button, ButtonGroup } from '../../button/Button'
import { Lockup } from '../../lockup/Lockup'
import RelativeDate from '../../relative-date/RelativeDate'
import Enrollment from '../../enrollment/Enrollment'
import Event from '../../event/Event'
import Notification from '../../notification/Notification'
import Sponsorship from '../../sponsorship/Sponsorship'

const constants = require('../../../utils/constants')
const urlBuilder = require('../../../utils/url-builder')

const meta = {
  schema: {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: constants.meta.name,
    url: process.env.SITE_URL,
    logo: `${process.env.SITE_URL}/images/meta/logo.png`,
    sameAs: [constants.social.twitter]
  }
}

function Home({
  apiStatus,
  clanIds,
  currentEvent,
  previousEvent,
  nextEvent,
  currentEventSummary
}) {
  return (
    <PageContainer meta={meta}>
      <Enrollment ids={clanIds} />
      {apiStatus && apiStatus.alert && (
        <Notification state="warning" html={apiStatus.alert} />
      )}
      {currentEvent ? (
        <Fragment>
          <Lockup
            id="current"
            primary
            center
            element="h1"
            kicker={constants.kicker.current}
          >
            <RelativeDate apiStatus={apiStatus} />
          </Lockup>
          <Event
            event={currentEvent}
            leaderboards={currentEventSummary}
            element="h2"
            summary
          />
          {previousEvent && (
            <Fragment>
              <Lockup
                id="previous"
                center
                primary
                element="h1"
                kicker={constants.kicker.previous}
              />
              <Event
                event={previousEvent}
                leaderboards={previousEvent.winners}
                element="h2"
                summary
              />
            </Fragment>
          )}
          <Lockup
            id="next"
            center
            primary
            element="h1"
            kicker={constants.kicker.next}
          />
          {nextEvent ? (
            <Event event={nextEvent} element="h2" summary />
          ) : (
            <Sponsorship />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Lockup
            id="next"
            center
            primary
            element="h1"
            kicker={constants.kicker.next}
          />
          {nextEvent ? (
            <Event event={nextEvent} element="h2" summary />
          ) : (
            <Sponsorship />
          )}
          {previousEvent && (
            <Fragment>
              <Lockup
                id="previous"
                center
                primary
                element="h1"
                kicker={constants.kicker.previous}
              />
              <Event
                event={previousEvent}
                leaderboards={previousEvent.winners}
                element="h2"
                summary
              />
            </Fragment>
          )}
        </Fragment>
      )}
      <ButtonGroup>
        <Button href={urlBuilder.eventRootUrl}>View all events</Button>
      </ButtonGroup>
    </PageContainer>
  )
}

Home.propTypes = {
  apiStatus: PropTypes.object,
  clanIds: PropTypes.array,
  currentEvent: PropTypes.object,
  previousEvent: PropTypes.object,
  nextEvent: PropTypes.object,
  currentEventSummary: PropTypes.array
}

export default Home
