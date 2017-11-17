import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Modifiers from '../components/modifiers/Modifiers'
import Leaderboard from '../components/leaderboard/Leaderboard'

const urlBuilder = require('../utils/url-builder')

class EventTemplate extends Component {
  render () {
    const { data } = this.props
    const currentEventKicker = 'Current event'
    const pastEventKicker = 'Past event'
    const futureEventKicker = 'Coming soon'
    const title = data.event.isCurrent ? currentEventKicker : `${data.event.name} | Events`
    const kicker = data.event.isCurrent ? currentEventKicker : (data.event.isPast ? pastEventKicker : futureEventKicker)
    const currentLeaderboard = data.allClan.edges.map(({ node }, i) => {
      return {
        ...node,
        icon: null,
        path: urlBuilder.eventUrl(data.event.path, node.id),
        rank: `#${i + 1}`,
        currentScore: '0',
        someStats: '0'
      }
    })
    const pastLeaderboard = data.allClan.edges.map(({ node }) => {
      return {
        ...node,
        icon: null
      }
    })
    const leaderboard = data.event.isCurrent ? currentLeaderboard : (data.event.isPast ? pastLeaderboard : [])

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="text-center">
          <Lockup className="text-center" kicker={kicker} heading={data.event.name} />
        </div>
        <Card cutout className="text-center">
          {data.event.description &&
            <p>{data.event.description}</p>
          }
          <Modifiers data={data.event.modifiers} />
          {data.event.isCurrent &&
            <div className="temp">
              <p>Dates / countdown</p>
              <div className="temp">
                <p>Leaderboard of all clans for each division</p>
                <p>Each "clan links" links through to the new "Current event clan page" (the one with the player history for this event on it)</p>
              </div>
            </div>
          }
          {data.event.isPast &&
            <div className="temp">
              <p>Dates</p>
              <div className="temp">
                <p>Clan winners medals</p>
              </div>
              <div className="temp">
                <p>Results board of all clans for each division</p>
                <p>Each "clan link" links through the general "Clan page" (there is no player history on that page)</p>
              </div>
            </div>
          }
          {data.event.isFuture &&
            <div className="temp">
              <p>Preview of future event</p>
            </div>
          }
        </Card>
        <Leaderboard cutout data={leaderboard} />
      </PageContainer>
    )
  }
}

EventTemplate.propTypes = {
  data: PropTypes.object
}

export default EventTemplate

export const pageQuery = graphql`
  query EventTemplateQuery($id: String!) {
    event(id: { eq: $id }) {
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
    allClan(sort: { fields: [ nameSortable ] }) {
      edges {
        node {
          id
          path
          name
          color
          foreground {
            color
            icon
          }
          background {
            color
            icon
          }
        }
      }
    }
  }
`
