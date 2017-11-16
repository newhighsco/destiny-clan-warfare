import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class MemberTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{data.member.name}</title>
        </Helmet>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" icon={data.member.icon} />
          <Lockup reverse className="text-center" kicker={data.clan.name} kickerHref={data.clan.path} heading={data.member.name} />
          <div className="temp">
            <p>When this page is reach from the current event it will show a summary of the players current event stats and the match history below</p>
            <p>It will also show some basic information about the current event (probably modifiers)</p>
          </div>
          <div className="temp">
            <p>When this page is reach from a previous event it will show all the Medals that the player has ever earned.</p>
            <p>It will also show the accumlative totals of the following for each player:</p>
            <p>Event count, Matches, Wins, Kills, Assists, Deaths, Score</p>
          </div>
        </Card>
        <Leaderboard cutout data={data.member.history} />
      </PageContainer>
    )
  }
}

MemberTemplate.propTypes = {
  data: PropTypes.object
}

export default MemberTemplate

export const pageQuery = graphql`
  query MemberTemplateQuery($id: String!, $clanId: String!) {
    member(id: { eq: $id }) {
      name
      icon
      history {
        game {
          path
          win
          type
          map
          date
        }
        kills
        assists
        deaths
        score
      }
    }
    clan(id: { eq: $clanId }) {
      path
      name
    }
  }
`
