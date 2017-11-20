import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class EventsPage extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allEvent.edges.map(edge => {
      return {
        game: {
          path: edge.node.path,
          type: edge.node.name,
          map: edge.node.isCurrent ? 'Ends' : (edge.node.isPast ? 'Ended' : 'Starts'),
          mapSeparator: ' ',
          date: edge.node.endDate
        },
        modifiers: edge.node.modifiers
      }
    })

    return (
      <PageContainer>
        <Helmet>
          <title>Events</title>
        </Helmet>
        <Card cutout className="text-center">
          <Lockup center kicker="All" heading="Events" />
          <div className="temp">
            <p>Search for event</p>
          </div>
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
          id
          path
          name
          description
          modifiers {
            id
            name
          }
          startDate
          endDate
          isPast
          isFuture
          isCurrent
        }
      }
    }
  }
`
