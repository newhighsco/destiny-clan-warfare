import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

const constants = require('../utils/constants')
const meta = {
  title: 'Events',
  description: `All upcoming, current, and, past ${constants.meta.name} events`
}

const EventsContainer = class extends PureComponent {
  constructor(props) {
    super(props)

    const { events } = this.props
    const leaderboard = events.map(event => {
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

EventsContainer.propTypes = {
  events: PropTypes.array
}

export default withRouteData(EventsContainer)
