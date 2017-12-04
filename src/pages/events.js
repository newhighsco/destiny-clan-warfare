import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

const constants = require('../utils/constants')

class EventsPage extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allEvent.edges.map(edge => {
      const mapSuffix = edge.node.isCurrent ? constants.kicker.current : (edge.node.isPast ? '' : constants.kicker.future)
      return {
        game: {
          path: edge.node.path,
          type: `${edge.node.name}${mapSuffix.length > 0 ? (` - ${mapSuffix}`) : ''}`,
          map: edge.node.isCurrent ? constants.relativeDate.current : (edge.node.isPast ? constants.relativeDate.past : constants.relativeDate.future),
          mapSeparator: ' ',
          date: edge.node.isCurrent ? edge.node.endDate : (edge.node.isPast) ? edge.node.endDate : edge.node.startDate
        },
        modifiers: edge.node.modifiers
      }
    })

    return (
      <PageContainer>
        <Helmet>
          <title>Events</title>
          <meta name="description" content="All Destiny Clan Warfare events to date" />
        </Helmet>
        <Card cutout className="text-center">
          <Lockup primary center kicker="All" heading="Events" />
        </Card>
        <Leaderboard cutout data={leaderboard} />
      </PageContainer>
    )
  }
}

EventsPage.propTypes = {
  data: PropTypes.object
}

export default EventsPage

export const data = {
  layout: 'content'
}

export const pageQuery = graphql`
  query EventsPageQuery {
    allEvent(sort: { fields: [ startDate ], order: DESC }) {
      edges {
        node {
          path
          name
          startDate
          endDate
          isCurrent
          isPast
          ...modifiersFragment
        }
      }
    }
  }
`
