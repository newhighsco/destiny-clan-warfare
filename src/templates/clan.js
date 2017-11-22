import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import Medals from '../components/medals/Medals'
import Button from '../components/button/Button'

const moment = require('moment')
const urlBuilder = require('../utils/url-builder')

class ClanTemplate extends Component {
  render () {
    const { data } = this.props
    const hasEvent = data.allEvent !== null
    const currentEvent = hasEvent ? data.allEvent.edges[0] : null
    const titleSuffix = hasEvent ? 'Current event' : 'Clans'
    const currentLeaderboard = hasEvent ? data.clan.leaderboard.map(item => {
      return {
        ...item,
        path: urlBuilder.eventUrl(currentEvent.node.path, data.clan.id, item.id)
      }
    }) : []
    const pastLeaderboard = data.allMember.edges.map(({ node }) => {
      return {
        path: node.path,
        name: node.name,
        icon: node.icon,
        ...node.totals
      }
    })
    const leaderboard = hasEvent ? currentLeaderboard : pastLeaderboard

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.clan.name} | ${titleSuffix}`}</title>
        </Helmet>
        {hasEvent &&
          <Lockup center kicker="Current event" kickerHref={currentEvent.node.path}>
            Updated {moment.utc(currentEvent.node.updatedDate).format('HH:mm [UTC]')}
          </Lockup>
        }
        <Card cutout className="text-center">
          <Avatar className="card__avatar" color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup center reverse kicker={data.clan.motto} heading={data.clan.name} />
          {hasEvent ? (
            <div className="temp">
              <p>"Top player" block to show who has played most matches etc.</p>
            </div>
          ) : ([
            <p key="description" dangerouslySetInnerHTML={{ __html: data.clan.description.replace(/(?:\r\n|\r|\n)/g, '<br />') }} />,
            <Button key="button" href={`https://www.bungie.net/en/ClanV2?groupid=${data.clan.id}`} target="_blank">Join clan</Button>,
            <Medals key="medals" count={5} />
          ])}
        </Card>
        <Leaderboard cutout data={leaderboard} sortBy="score" descending />
      </PageContainer>
    )
  }
}

ClanTemplate.propTypes = {
  data: PropTypes.object
}

export default ClanTemplate

export const pageQuery = graphql`
  query ClanTemplateQuery($id: String!, $eventId: String) {
    clan(id: { eq: $id }) {
      id
      name
      motto
      description
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
        games
        wins
        kills
        deaths
        assists
        score
      }
    }
    allMember(filter: { clanId: { eq: $id } }, sort: { fields: [ nameSortable ] }) {
      edges {
        node {
          path
          name
          icon
          totals {
            wins
            kills
            deaths
            assists
            score
            lastPlayed
          }
        }
      }
    }
    allEvent(filter: { id: { eq: $eventId } }) {
      edges {
        node {
          updatedDate
          path
        }
      }
    }
  }
`
