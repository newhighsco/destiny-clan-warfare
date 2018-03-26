import React, { Component, Fragment } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import { Button, ButtonGroup } from '../components/button/Button'
import { Lockup } from '../components/lockup/Lockup'
import RelativeDate from '../components/relative-date/RelativeDate'
import Advert from '../components/advert/Advert'
import Enrollment from '../components/enrollment/Enrollment'
import CurrentEvent from '../components/event/CurrentEvent'
import PreviousEvent from '../components/event/PreviousEvent'
import FutureEvent from '../components/event/FutureEvent'
import LogoImage from '../images/avatar-512x512.jpg'

const constants = require('../utils/constants')

class IndexPage extends Component {
  render () {
    const { data } = this.props
    const currentEvent = data.currentEvents ? data.currentEvents[0] : null
    const previousEvent = data.pastEvents ? data.pastEvents[0] : null
    const nextEvent = data.futureEvents ? data.futureEvents[0] : null
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: constants.meta.name,
      url: process.env.GATSBY_SITE_URL,
      logo: `${process.env.GATSBY_SITE_URL}${LogoImage}`,
      sameAs: [
        constants.social.twitter
      ]
    }

    return (
      <PageContainer>
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Enrollment clans={data.allClan} />
        {currentEvent ? (
          <Fragment>
            <Lockup id="current" primary center element="h1" kicker={constants.kicker.current}>
              <RelativeDate status />
            </Lockup>
            <CurrentEvent event={currentEvent} element="h2" summary />
            {previousEvent &&
              <Fragment>
                <Advert />
                <Lockup id="previous" center primary element="h1" kicker={constants.kicker.previous} />
                <PreviousEvent event={previousEvent} element="h2" summary />
              </Fragment>
            }
            {nextEvent &&
              <Fragment>
                {previousEvent &&
                  <Advert />
                }
                <Lockup id="next" center primary element="h1" kicker={constants.kicker.next} />
                <FutureEvent event={nextEvent} element="h2" summary />
              </Fragment>
            }
          </Fragment>
        ) : (
          <Fragment>
            {nextEvent &&
              <Fragment>
                <Lockup id="next" center primary element="h1" kicker={constants.kicker.next} />
                <FutureEvent event={nextEvent} element="h2" summary />
              </Fragment>
            }
            {previousEvent &&
              <Fragment>
                {nextEvent &&
                  <Advert />
                }
                <Lockup id="previous" center primary element="h1" kicker={constants.kicker.previous} />
                <PreviousEvent event={previousEvent} element="h2" summary />
              </Fragment>
            }
          </Fragment>
        )}
        <ButtonGroup>
          <Button href="/events/">View all events</Button>
        </ButtonGroup>
      </PageContainer>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default withRouteData(IndexPage)
