import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

const urlBuilder = require('../utils/url-builder')

class MemberTemplate extends Component {
  render () {
    const { data } = this.props
    const hasEvent = data.allEvent !== null
    const currentEvent = hasEvent ? data.allEvent.edges[0] : null
    const titleSuffix = hasEvent ? 'Current event' : 'Members'
    const kickerHref = hasEvent ? urlBuilder.eventUrl(currentEvent.node.path, data.clan.id) : data.clan.path
    const leaderboard = hasEvent ? data.member.history : []

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | ${titleSuffix}`}</title>
        </Helmet>
        {hasEvent &&
          <Lockup center kicker="Current event" kickerHref={currentEvent.node.path} />
        }
        <Card cutout className="text-center">
          <Avatar className="card__avatar" icon={data.member.icon} />
          <Lockup center reverse kicker={data.clan.name} kickerHref={kickerHref} heading={data.member.name} />
          {hasEvent ? (
            <div className="temp">
              <p>When this page is reach from the current event it will show a summary of the players current event stats and the match history below</p>
              <p>It will also show some basic information about the current event (probably modifiers)</p>
            </div>
          ) : (
            <div className="temp">
              <p>When this page is reach from a previous event it will show all the Medals that the player has ever earned.</p>
              <p>It will also show the accumlative totals of the following for each player:</p>
              <p>Event count, Matches, Wins, Kills, Assists, Deaths, Score</p>
            </div>
          )}
        </Card>
        <Leaderboard cutout data={leaderboard} />
      </PageContainer>
    )
  }
}

MemberTemplate.propTypes = {
  data: PropTypes.object
}

export default MemberTemplate

export const pageQuery = graphql`
  query MemberTemplateQuery($id: String!, $clanId: String!, $eventId: String) {
    member(id: { eq: $id }) {
      name
      icon
      history {
        game {
          path
          isExternal
          result
          type
          map
          mapSeparator
          date
        }
        kills
        assists
        deaths
        score
      }
    }
    clan(id: { eq: $clanId }) {
      id
      path
      name
    }
    allEvent(filter: { id: { eq: $eventId } }) {
      edges {
        node {
          id
          path
          name
        }
      }
    }
  }
`
