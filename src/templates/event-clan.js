import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'
import { StatList } from '../components/stat/Stat'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const kda = require('../utils/kda')

class EventClanTemplate extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.clan.leaderboard.filter(({ games }) => games > 0)
    var stats

    if (leaderboard.length) {
      const topGames = leaderboard.reduce((a, b) => (a.games > b.games) ? a : b)
      const topWins = leaderboard.reduce((a, b) => (a.wins > b.wins) ? a : b)
      const topKDA = leaderboard.reduce((a, b) => (kda(a) > kda(b)) ? a : b)
      const topScore = leaderboard.reduce((a, b) => (a.score > b.score) ? a : b)

      stats = {
        mostGames: topGames ? { stat: `${topGames.games}`, label: topGames.name } : null,
        mostWins: topWins ? { stat: `${topWins.wins}`, label: topWins.name } : null,
        highestKDA: topKDA ? { stat: `${kda(topKDA)}`, label: topKDA.name } : null,
        highestScore: topScore ? { stat: `${topScore.score}`, label: topScore.name } : null
      }
    }

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.clan.name} | Current event`}</title>
        </Helmet>
        <Lockup center kicker="Current event" kickerHref={urlBuilder.eventUrl(data.clan.currentEventId)}>
          <RelativeDate label={constants.relativeDate.updated} date={data.clan.updatedDate} />
        </Lockup>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup center reverse kicker={data.clan.motto} heading={data.clan.name} />
          <StatList stats={stats} />
        </Card>
        <Leaderboard cutout data={leaderboard} sortBy="score" descending />
      </PageContainer>
    )
  }
}

EventClanTemplate.propTypes = {
  data: PropTypes.object
}

export default EventClanTemplate

export const pageQuery = graphql`
  query EventClanTemplateQuery($id: String!) {
    clan(id: { eq: $id }) {
      id
      updatedDate
      currentEventId
      name
      motto
      color
      foreground {
        color
        icon
      }
      background {
        color
        icon
      }
      leaderboard {
        id
        path
        name
        icon
        tags {
          name
        }
        games
        wins
        kills
        deaths
        assists
        score
      }
    }
  }
`
