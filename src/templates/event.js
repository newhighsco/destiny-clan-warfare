import React, { Component } from 'react'
import { withRouteData, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import { Lockup } from '../components/lockup/Lockup'
import RelativeDate from '../components/relative-date/RelativeDate'
import CurrentEvent from '../components/event/CurrentEvent'
import FutureEvent from '../components/event/FutureEvent'
import PreviousEvent from '../components/event/PreviousEvent'
import SchemaImage from '../images/favicon-1200x1200.png'

const moment = require('moment')
const constants = require('../utils/constants')

class EventTemplate extends Component {
  render () {
    const { event } = this.props
    const kicker = event.isCurrent ? constants.kicker.current : (event.isPast ? constants.kicker.past : constants.kicker.future)
    const title = `${event.name} | ${kicker}`
    const description = event.isCurrent
      ? `The divisional leaderboards for the current ${constants.meta.name} event`
      : (event.isPast
        ? `The results of past ${event.name} ${constants.meta.name} event`
        : `Preview of upcoming ${event.name} ${constants.meta.name} event`)
    const url = `${process.env.SITE_URL}${event.path}`
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'Event',
      url: url,
      name: `${constants.meta.name} - ${event.name}`,
      description: event.description,
      startDate: moment(event.startDate).format(),
      endDate: moment(event.endDate).format(),
      image: `${process.env.SITE_URL}${SchemaImage}`,
      location: {
        '@type': 'Place',
        name: constants.meta.name,
        sameAs: process.env.SITE_URL,
        address: url
      }
    }

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
        <Lockup primary center kicker={kicker}>
          {event.isCurrent &&
            <RelativeDate status />
          }
        </Lockup>
        {event.isCurrent &&
          <CurrentEvent event={event} />
        }
        {event.isPast &&
          <PreviousEvent event={event} />
        }
        {event.isFuture &&
          <FutureEvent event={event} />
        }
      </PageContainer>
    )
  }
}

EventTemplate.propTypes = {
  event: PropTypes.object
}

export default withRouteData(EventTemplate)
