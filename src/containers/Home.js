import React, { PureComponent, Fragment } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import { Button, ButtonGroup } from '../components/button/Button'
import { Lockup } from '../components/lockup/Lockup'
import RelativeDate from '../components/relative-date/RelativeDate'
import Advert from '../components/advert/Advert'
import Enrollment from '../components/enrollment/Enrollment'
import EventCurrent from '../components/event/Current'
import EventPrevious from '../components/event/Previous'
import EventFuture from '../components/event/Future'
import Notification from '../components/notification/Notification'
import LogoImage from '../images/avatar-512x512.jpg'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

const meta = {
  schema: {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: constants.meta.name,
    url: process.env.SITE_URL,
    logo: `${LogoImage}`,
    sameAs: [
      constants.social.twitter
    ]
  }
}

class HomeContainer extends PureComponent {
  render () {
    const { apiStatus, clans, currentEvent, previousEvent, nextEvent, currentEventLeaderboards, previousEventLeaderboards } = this.props

    return (
      <PageContainer meta={meta}>
        <Enrollment apiStatus={apiStatus} clans={clans} />
        {apiStatus && apiStatus.alert &&
          <Notification state="notice" html={apiStatus.alert} />
        }
        {currentEvent ? (
          <Fragment>
            <Lockup id="current" primary center element="h1" kicker={constants.kicker.current}>
              <RelativeDate apiStatus={apiStatus} />
            </Lockup>
            <EventCurrent event={currentEvent} leaderboards={currentEventLeaderboards} element="h2" summary />
            {previousEvent &&
              <Fragment>
                <Advert />
                <Lockup id="previous" center primary element="h1" kicker={constants.kicker.previous} />
                <EventPrevious event={previousEvent} leaderboards={previousEventLeaderboards} element="h2" summary />
              </Fragment>
            }
            {nextEvent &&
              <Fragment>
                {previousEvent &&
                  <Advert />
                }
                <Lockup id="next" center primary element="h1" kicker={constants.kicker.next} />
                <EventFuture event={nextEvent} element="h2" summary />
              </Fragment>
            }
          </Fragment>
        ) : (
          <Fragment>
            {nextEvent &&
              <Fragment>
                <Lockup id="next" center primary element="h1" kicker={constants.kicker.next} />
                <EventFuture event={nextEvent} element="h2" summary />
              </Fragment>
            }
            {previousEvent &&
              <Fragment>
                {nextEvent &&
                  <Advert />
                }
                <Lockup id="previous" center primary element="h1" kicker={constants.kicker.previous} />
                <EventPrevious event={previousEvent} leaderboards={previousEventLeaderboards} element="h2" summary />
              </Fragment>
            }
          </Fragment>
        )}
        <ButtonGroup>
          <Button href={urlBuilder.eventRootUrl}>View all events</Button>
        </ButtonGroup>
      </PageContainer>
    )
  }
}

HomeContainer.propTypes = {
  apiStatus: PropTypes.object,
  clans: PropTypes.array,
  currentEvent: PropTypes.object,
  previousEvent: PropTypes.object,
  nextEvent: PropTypes.object,
  currentEventLeaderboards: PropTypes.array,
  previousEventLeaderboards: PropTypes.array
}

export default withRouteData(HomeContainer)
