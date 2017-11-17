import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Modifiers from '../components/modifiers/Modifiers'
import Leaderboard from '../components/leaderboard/Leaderboard'

class EventsPage extends Component {
  render () {
    const { data } = this.props
    const currentEvents = data.allEvent.edges.filter(({ node }) => node.isCurrent)
    const pastEvents = data.allEvent.edges.filter(({ node }) => node.isPast)
    const futureEvents = data.allEvent.edges.filter(({ node }) => node.isFuture)
    const pastLeaderboard = pastEvents.map(edge => {
      return {
        game: {
          path: edge.node.path,
          type: edge.node.name,
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
        {currentEvents.map(({ node }) => {
          return (
            <Card key={node.id} className="text-center">
              <Lockup className="text-center" kicker="Current event" kickerHref={node.path} heading={node.name} />
              {node.description &&
                <p>{node.description}</p>
              }
              <Modifiers data={node.modifiers} />
            </Card>
          )
        })}
        <div className="temp">
          <p>Current event</p>
          <p>Name</p>
          <p>Description</p>
          <p>Dates / countdown</p>
          <div className="temp">
            <p>List of modifier icons</p>
          </div>
          <div className="temp">
            <p>Top 3/5 for each division</p>
            <p>Name, Overall score, Active members (I can work this out), Total members (I can work this out)</p>
            <p>Link to see all</p>
          </div>
        </div>
        {futureEvents.map(({ node }) => {
          return (
            <Card key={node.id} className="text-center">
              <Lockup className="text-center" kicker="Coming soon" kickerHref={node.path} heading={node.name} />
              {node.description &&
                <p>{node.description}</p>
              }
              <Modifiers data={node.modifiers} />
            </Card>
          )
        })}
        {pastEvents.length > 0 && [
          <Card key="card" cutout className="text-center">
            <Lockup className="text-center" kicker="Past events" />
          </Card>,
          <Leaderboard key="leaderboard" cutout data={pastLeaderboard} />
        ]}
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
