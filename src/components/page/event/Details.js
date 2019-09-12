import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../../page-container/PageContainer'
import { Lockup } from '../../lockup/Lockup'
import RelativeDate from '../../relative-date/RelativeDate'
import Event from '../../event/Event'
import { ButtonGroup, Button } from '../../button/Button'

const moment = require('moment')
const constants = require('../../../utils/constants')
const urlBuilder = require('../../../utils/url-builder')

const EventDetails = class extends PureComponent {
  constructor(props) {
    super(props)

    const { event } = this.props

    if (!event) return

    const kicker = event.isCurrent
      ? constants.kicker.current
      : event.isPast
      ? constants.kicker.past
      : constants.kicker.future
    const title = `${event.name} | ${kicker}`
    const description = event.isCurrent
      ? `The divisional leaderboards for the current ${
          constants.meta.name
        } event`
      : event.isPast
      ? `The results of past ${event.name} ${constants.meta.name} event`
      : `Preview of upcoming ${event.name} ${constants.meta.name} event`
    const url = `${process.env.SITE_URL}${event.path}`
    const schema = [
      {
        '@context': 'http://schema.org',
        '@type': 'Event',
        url,
        name: `${constants.meta.name} - ${event.name}`,
        description: event.description,
        startDate: moment(event.startDate).format(),
        endDate: moment(event.endDate).format(),
        image: `${process.env.SITE_URL}/images/meta/sharing.png`,
        location: {
          '@type': 'Place',
          name: constants.meta.name,
          sameAs: process.env.SITE_URL,
          address: url
        },
        offers: {
          '@type': 'Offer',
          url
        },
        performer: {
          '@type': 'Organization',
          name: constants.meta.name
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
  render() {
    const { apiStatus, event, leaderboards, suggestions, stats } = this.props

    if (!event) return null

    const { meta } = this.state

    return (
      <PageContainer meta={meta}>
        <Lockup primary center kicker={meta.kicker}>
          {event.isCurrent && <RelativeDate apiStatus={apiStatus} />}
        </Lockup>
        <Event
          event={event}
          leaderboards={leaderboards}
          suggestions={suggestions}
          stats={stats}
        />
        <ButtonGroup>
          <Button href={urlBuilder.eventRootUrl}>View all events</Button>
        </ButtonGroup>
      </PageContainer>
    )
  }
}

EventDetails.propTypes = {
  apiStatus: PropTypes.object,
  event: PropTypes.object,
  leaderboards: PropTypes.array,
  suggestions: PropTypes.array,
  stats: PropTypes.object
}

export default EventDetails
