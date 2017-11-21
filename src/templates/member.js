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

const urlBuilder = require('../utils/url-builder')

class MemberTemplate extends Component {
  render () {
    const { data } = this.props
    const hasEvent = data.allEvent !== null
    const currentEvent = hasEvent ? data.allEvent.edges[0] : null
    const titleSuffix = hasEvent ? 'Current event' : 'Members'
    const kickerHref = hasEvent ? urlBuilder.eventUrl(currentEvent.node.path, data.clan.id) : data.clan.path
    const leaderboard = hasEvent ? data.member.history : [ data.member.totals ]

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | ${titleSuffix}`}</title>
        </Helmet>
        {hasEvent &&
          <Lockup center kicker="Current event" kickerHref={currentEvent.node.path} />
        }
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <Lockup center reverse kicker={data.clan.name} kickerHref={kickerHref} heading={data.member.name} />
          {hasEvent ? (
            <div className="temp">
              <p>Event totals</p>
            </div>
          ) : ([
            <Button key="button" href={`https://www.bungie.net/en/Profile/${data.member.id}`} target="_blank">View profile</Button>,
            <Medals key="medals" count={2} />
          ])}
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
      id
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
      totals {
        wins
        kills
        assists
        deaths
        score
        lastPlayed
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
          path
        }
      }
    }
  }
`
