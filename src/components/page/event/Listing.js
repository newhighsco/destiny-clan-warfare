import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../../page-container/PageContainer'
import Card from '../../card/Card'
import { Lockup } from '../../lockup/Lockup'
import Leaderboard from '../../leaderboard/Leaderboard'
import { Tag } from '../../tag/Tag'

const constants = require('../../../utils/constants')
const urlBuilder = require('../../../utils/url-builder')
const meta = {
  title: 'Events',
  description: `All upcoming, current, and, past ${constants.meta.name} events`
}

const EventListing = class extends PureComponent {
  constructor(props) {
    super(props)

    const { events } = this.props

    const leaderboard = events
      ? events.map(event => {
          const kicker = event.isCurrent
            ? constants.kicker.current
            : event.isPast
            ? null
            : constants.kicker.future

          return {
            game: {
              ...event,
              name: `${event.name}${kicker ? ` - ${kicker}` : ''}`
            },
            modifiers: event.modifiers
          }
        })
      : []

    const patreonTier = constants.patreon.eventCreator
    const linkAttributes = {
      href: urlBuilder.patreonUrl(patreonTier),
      target: '_blank'
    }
    const unknownModifier = {
      name: patreonTier.name,
      description: patreonTier.description,
      promoted: true,
      ...linkAttributes
    }

    leaderboard.unshift({
      promoted: true,
      game: {
        path: linkAttributes.href,
        isExternal: true,
        name: `${patreonTier.name} - Create your own event`,
        description: (
          <span>
            And wear the exclusive <Tag element="span" name="Insider" /> badge
            of honour.
          </span>
        )
      },
      modifiers: [unknownModifier, unknownModifier, unknownModifier]
    })

    this.state = {
      leaderboard
    }
  }

  render() {
    const { leaderboard } = this.state

    return (
      <PageContainer meta={meta}>
        <Card cutout center>
          <Lockup primary center kicker="All" heading="Events" />
        </Card>
        <Leaderboard cutout data={leaderboard} />
      </PageContainer>
    )
  }
}

EventListing.propTypes = {
  events: PropTypes.array
}

export default EventListing
