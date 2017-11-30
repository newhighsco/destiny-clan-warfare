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

class EventMemberTemplate extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.member.history.filter(({ game }) => game.path.length)

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | Current event`}</title>
        </Helmet>
        <Lockup center kicker="Current event" kickerHref={urlBuilder.eventUrl(data.member.currentEventId)}>
          <RelativeDate label={constants.relativeDate.updated} date={data.member.updatedDate} />
        </Lockup>
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <Lockup center reverse kicker={data.member.clan.name} kickerHref={urlBuilder.eventUrl(data.member.currentEventId, data.member.clanId)} heading={data.member.name} />
          <StatList stats={data.member.leaderboard} />
        </Card>
        <Leaderboard cutout data={leaderboard} />
      </PageContainer>
    )
  }
}

EventMemberTemplate.propTypes = {
  data: PropTypes.object
}

export default EventMemberTemplate

export const pageQuery = graphql`
  query EventMemberTemplateQuery($id: String!) {
    member(id: { eq: $id }) {
      id
      updatedDate
      currentEventId
      name
      icon
      clanId
      clan {
        name
      }
      leaderboard {
        games
        wins
        kills
        deaths
        assists
        score
      }
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
        deaths
        assists
        score
      }
    }
  }
`
