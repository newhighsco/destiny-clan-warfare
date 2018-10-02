import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import { Lockup } from '../components/lockup/Lockup'
import RelativeDate from '../components/relative-date/RelativeDate'
import Event from '../components/event/Event'
import { ButtonGroup, Button } from '../components/button/Button'
import SchemaImage from '../images/favicon-1200x1200.png'

const moment = require('moment')
const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

class EventContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { event } = this.props
    const kicker = event.isCurrent ? constants.kicker.current : (event.isPast ? constants.kicker.past : constants.kicker.future)
    const title = `${event.name} | ${kicker}`
    const description = event.isCurrent
      ? `The divisional leaderboards for the current ${constants.meta.name} event`
      : (event.isPast
        ? `The results of past ${event.name} ${constants.meta.name} event`
        : `Preview of upcoming ${event.name} ${constants.meta.name} event`)
    const url = `${process.env.SITE_URL}${event.path}`
    const schema = [
      {
        '@context': 'http://schema.org',
        '@type': 'Event',
        url: url,
        name: `${constants.meta.name} - ${event.name}`,
        description: event.description,
        startDate: moment(event.startDate).format(),
        endDate: moment(event.endDate).format(),
        image: `${SchemaImage}`,
        location: {
          '@type': 'Place',
          name: constants.meta.name,
          sameAs: process.env.SITE_URL,
          address: url
        }
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': `${process.env.SITE_URL}${urlBuilder.eventRootUrl}`,
              name: 'Events'
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': url,
              name: event.name
            }
          }
        ]
      }
    ]
    const meta = {
      kicker,
      title,
      description,
      schema
    }

    this.state = {
      meta
    }
  }
  render () {
    const { apiStatus, event, leaderboards, suggestions, stats } = this.props
    const { meta } = this.state

    return (
      <PageContainer meta={meta}>
        <Lockup primary center kicker={meta.kicker}>
          {event.isCurrent &&
            <RelativeDate apiStatus={apiStatus} />
          }
        </Lockup>
        <Event event={event} leaderboards={leaderboards} suggestions={suggestions} stats={stats} />
        <ButtonGroup>
          <Button href={urlBuilder.eventRootUrl}>View all events</Button>
        </ButtonGroup>
      </PageContainer>
    )
  }
}

EventContainer.propTypes = {
  apiStatus: PropTypes.object,
  event: PropTypes.object,
  leaderboards: PropTypes.array,
  suggestions: PropTypes.array,
  stats: PropTypes.object
}

export default withRouteData(EventContainer)
