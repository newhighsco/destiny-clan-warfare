import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'
import { StatList } from '../components/stat/Stat'
import Notification from '../components/notification/Notification'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const kda = require('../utils/kda')
const possessive = require('../utils/possessive')

class EventClanTemplate extends Component {
  render () {
    const { data } = this.props

    const leaderboard = data.clan.leaderboard.filter(({ games }) => games > 0)
    const title = `${data.clan.name} | ${constants.kicker.current}`
    const description = `${possessive(data.clan.name)} clan standings in the current ${constants.meta.name} event`
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': `${process.env.GATSBY_SITE_URL}${urlBuilder.eventUrl(data.clan.currentEventId)}`,
            name: constants.kicker.current
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${process.env.GATSBY_SITE_URL}${urlBuilder.eventUrl(data.clan.currentEventId, data.clan.id.substring(constants.prefix.hash.length))}`,
            name: data.clan.name
          }
        }
      ]
    }

    const columns = [
      'games',
      'wins',
      'kd',
      'kda',
      'bonuses',
      'score'
    ]
    const stats = {}
    const hasLeaderboard = leaderboard.length > 0

    if (hasLeaderboard) {
      columns.map(column => {
        var top = leaderboard.reduce((a, b) => (parseInt(a[column]) > parseInt(b[column])) ? a : b)
        var key = column
        var stat = (top) => top[column]

        if (column === 'kd') {
          top = leaderboard.reduce((a, b) => (kda(a, true) > kda(b, true)) ? a : b)
          stat = (top) => kda(top, true)
        }

        if (column === 'kda') {
          top = leaderboard.reduce((a, b) => (kda(a) > kda(b)) ? a : b)
          stat = (top) => kda(top)
        }

        if (column === 'bonuses') {
          const bonusCount = (item, key) => {
            return item.bonuses.find(bonus => bonus.shortName === key).count
          }
          const bonusesKeys = leaderboard[0].bonuses.map(bonus => bonus.shortName)

          bonusesKeys.map(key => {
            top = leaderboard.reduce((a, b) => (bonusCount(a, key) > bonusCount(b, key)) ? a : b)
            stat = (top) => bonusCount(top, key)

            if (top) stats[key] = { stat: `${stat(top)}`, label: top.name }
          })

          top = null
        }

        if (top) stats[key] = { stat: `${stat(top)}`, label: top.name }
      })
    }

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.eventUrl(data.clan.currentEventId)}>
          <RelativeDate status />
        </Lockup>
        <Card cutout={hasLeaderboard} center>
          <Avatar cutout outline color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup center reverse kicker={data.clan.motto} heading={data.clan.name} />
          <StatList stats={stats} />
          {!hasLeaderboard &&
            <Notification>Leaderboard for this event is being calculated. Please check back later.</Notification>
          }
        </Card>
        {hasLeaderboard &&
          <Leaderboard
            cutout
            data={leaderboard}
            columns={[ 'path', 'name', 'icon', 'tags', 'games', 'wins', 'kills', 'deaths', 'assists', 'bonuses', 'score' ]}
            sorting={{ score: 'DESC' }}
          />
        }
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
      path
      id
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
        bonuses {
          shortName
          count
        }
        score
      }
    }
  }
`
