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
    const currentEvent = data.allEvent !== null
    const titleSuffix = currentEvent ? 'Current event' : 'Members'
    const kickerHref = currentEvent ? urlBuilder.currentEventUrl(data.clan.id) : data.clan.path
    const leaderboard = currentEvent ? data.member.history : []

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | ${titleSuffix}`}</title>
        </Helmet>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" icon={data.member.icon} />
          <Lockup reverse className="text-center" kicker={data.clan.name} kickerHref={kickerHref} heading={data.member.name} />
          {currentEvent ? (
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
          {currentEvent &&
            <Lockup kicker="Current event" />
          }
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
        }
      }
    }
  }
`
