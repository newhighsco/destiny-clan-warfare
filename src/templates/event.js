import React, { Component, Fragment } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
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
    const { data } = this.props
    const kicker = data.event.isCurrent ? constants.kicker.current : (data.event.isPast ? constants.kicker.past : constants.kicker.future)
    const title = `${data.event.name} | ${kicker}`
    const description = data.event.isCurrent
      ? `The divisional leaderboards for the current ${constants.meta.name} event`
      : (data.event.isPast
        ? `The results of past ${data.event.name} ${constants.meta.name} event`
        : `Preview of upcoming ${data.event.name} ${constants.meta.name} event`)
    const url = `${process.env.GATSBY_SITE_URL}${data.event.path}`
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'Event',
      url: url,
      name: `${constants.meta.name} - ${data.event.name}`,
      description: data.event.description,
      startDate: moment(data.event.startDate).format(),
      endDate: moment(data.event.endDate).format(),
      image: `${process.env.GATSBY_SITE_URL}${SchemaImage}`,
      location: {
        '@type': 'Place',
        name: constants.meta.name,
        sameAs: process.env.GATSBY_SITE_URL,
        address: url
      }
    }

    return (
      <PageContainer {...this.props}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        {data.event.isCurrent &&
          <Fragment>
            <Lockup primary center kicker={kicker}>
              <RelativeDate status />
            </Lockup>
            <CurrentEvent event={data.event} />
          </Fragment>
        }
        {data.event.isPast &&
          <Fragment>
            <Lockup primary center kicker={kicker} />
            <PreviousEvent event={data.event} />
          </Fragment>
        }
        {data.event.isFuture &&
          <Fragment>
            <Lockup primary center kicker={kicker} />
            <FutureEvent event={data.event} />
          </Fragment>
        }
      </PageContainer>
    )
  }
}

EventTemplate.propTypes = {
  data: PropTypes.object
}

export default withRouteData(EventTemplate)
