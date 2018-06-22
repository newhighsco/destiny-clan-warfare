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
    const { clans, events } = this.props
    var currentEvent
    var previousEvent
    var nextEvent

    events.map(event => {
      if (event.isCurrent && !currentEvent) currentEvent = event
      if (event.isPast && !previousEvent) previousEvent = event
      if (event.isFuture) nextEvent = event
    })

    return (
      <PageContainer meta={meta}>
        <Enrollment clans={clans} />
        {currentEvent ? (
          <Fragment>
            <Lockup id="current" primary center element="h1" kicker={constants.kicker.current}>
              <RelativeDate status />
            </Lockup>
            <EventCurrent event={currentEvent} element="h2" summary />
            {previousEvent &&
              <Fragment>
                <Advert />
                <Lockup id="previous" center primary element="h1" kicker={constants.kicker.previous} />
                <EventPrevious event={previousEvent} element="h2" summary />
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
                <EventPrevious event={previousEvent} element="h2" summary />
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
  clans: PropTypes.array,
  events: PropTypes.array
}

export default withRouteData(HomeContainer)
