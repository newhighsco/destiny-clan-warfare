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

class EventsContainer extends PureComponent {
  render () {
    const { events } = this.props

    return (
      <PageContainer {...meta}>
        <Card cutout center>
          <Lockup primary center kicker="All" heading="Events" />
        </Card>
        <Leaderboard cutout data={events} />
      </PageContainer>
    )
  }
}

EventsContainer.propTypes = {
  events: PropTypes.array
}

export default withRouteData(EventsContainer)
