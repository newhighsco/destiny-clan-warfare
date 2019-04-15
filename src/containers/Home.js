import React, { PureComponent, Fragment } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import { Button, ButtonGroup } from '../components/button/Button'
import { Lockup } from '../components/lockup/Lockup'
import RelativeDate from '../components/relative-date/RelativeDate'
import Advert from '../components/advert/Advert'
import Enrollment from '../components/enrollment/Enrollment'
import Event from '../components/event/Event'
import Notification from '../components/notification/Notification'
import LogoImage from '../images/meta/favicon-512x512.png'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

const meta = {
  schema: {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: constants.meta.name,
    url: process.env.SITE_URL,
    logo: `${process.env.SITE_URL}${LogoImage}`,
    sameAs: [
      constants.social.twitter
    ]
  }
}

class HomeContainer extends PureComponent {
  render () {
    const { apiStatus, clanIds, currentEvent, previousEvent, nextEvent, currentEventSummary } = this.props

    return (
      <PageContainer meta={meta}>
        <Enrollment apiStatus={apiStatus} ids={clanIds} />
        {apiStatus && apiStatus.alert &&
          <Notification state="warning" html={apiStatus.alert} />
        }
        {currentEvent ? (
          <Fragment>
            <Lockup id="current" primary center element="h1" kicker={constants.kicker.current}>
              <RelativeDate apiStatus={apiStatus} />
            </Lockup>
            <Event event={currentEvent} leaderboards={currentEventSummary} element="h2" summary />
            {previousEvent &&
              <Fragment>
                <Advert />
                <Lockup id="previous" center primary element="h1" kicker={constants.kicker.previous} />
                <Event event={previousEvent} leaderboards={previousEvent.winners} element="h2" summary />
              </Fragment>
            }
            {nextEvent &&
              <Fragment>
                {previousEvent &&
                  <Advert />
                }
                <Lockup id="next" center primary element="h1" kicker={constants.kicker.next} />
                <Event event={nextEvent} element="h2" summary />
              </Fragment>
            }
          </Fragment>
        ) : (
          <Fragment>
            {nextEvent &&
              <Fragment>
                <Lockup id="next" center primary element="h1" kicker={constants.kicker.next} />
                <Event event={nextEvent} element="h2" summary />
              </Fragment>
            }
            {previousEvent &&
              <Fragment>
                {nextEvent &&
                  <Advert />
                }
                <Lockup id="previous" center primary element="h1" kicker={constants.kicker.previous} />
                <Event event={previousEvent} leaderboards={previousEvent.winners} element="h2" summary />
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
  clanIds: PropTypes.array,
  currentEvent: PropTypes.object,
  previousEvent: PropTypes.object,
  nextEvent: PropTypes.object,
  currentEventSummary: PropTypes.array
}

export default withRouteData(HomeContainer)
