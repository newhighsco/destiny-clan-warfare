import React, { Component } from 'react'
import { withRouteData, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'
import { StatList } from '../components/stat/Stat'
import Notification from '../components/notification/Notification'
import { PlatformList } from '../components/platform/Platform'
import { Tab, TabContainer } from '../components/tab/Tab'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const statsHelper = require('../utils/stats-helper')
const possessive = require('../utils/grammar').possessive

class EventClanTemplate extends Component {
  render () {
    const { clan, members } = this.props
    const clanUrl = urlBuilder.clanUrl(clan.id)
    const leaderboard = clan.leaderboard.filter(member => member).map(member => {
      const hasPlayed = member.games > 0

      return {
        path: hasPlayed ? member.path : null,
        platforms: member.platforms,
        name: member.name,
        icon: member.icon,
        tags: member.tags,
        updated: hasPlayed ? member.updated : null,
        rank: hasPlayed ? '' : null,
        games: hasPlayed ? member.games : null,
        wins: hasPlayed ? member.wins : null,
        kills: hasPlayed ? member.kills : null,
        assists: hasPlayed ? member.assists : null,
        deaths: hasPlayed ? member.deaths : null,
        bonuses: member.bonuses,
        score: hasPlayed ? member.score : null,
        member: members.find(({ id }) => id === member.id)
      }
    })
    const title = `${clan.name} | ${constants.kicker.current}`
    const description = `${possessive(clan.name)} clan standings in the current ${constants.meta.name} event`
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': `${process.env.SITE_URL}${urlBuilder.currentEventUrl()}`,
            name: constants.kicker.current
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${process.env.SITE_URL}${urlBuilder.currentEventUrl(clan.id)}`,
            name: clan.name
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
      'ppg',
      'score'
    ]
    const stats = {}
    const filteredLeaderboard = leaderboard.filter(({ games }) => games > 0)
    const hasLeaderboard = filteredLeaderboard.length > 0

    if (hasLeaderboard) {
      const reduce = (stat) => filteredLeaderboard.reduce((a, b) => stat(a) > stat(b) ? a : b)
      const add = (column, stat, top) => {
        if (top) {
          const value = stat(top)
          const names = leaderboard.filter(row => stat(row) === value).map(row => row.name)

          stats[column] = { stat: value, label: names }
        }
      }

      columns.map(column => {
        var stat = (row) => parseInt(row[column])

        if (column === 'kd') {
          stat = (row) => statsHelper.kd(row)
        }

        if (column === 'kda') {
          stat = (row) => statsHelper.kda(row)
        }

        if (column === 'ppg') {
          stat = (row) => statsHelper.ppg(row)
        }

        var top = reduce(stat)

        if (column === 'bonuses') {
          const bonusCount = (row, key) => {
            return row.bonuses.find(bonus => bonus.shortName === key).count
          }
          const bonusesKeys = leaderboard[0].bonuses.map(bonus => bonus.shortName)

          bonusesKeys.map(key => {
            stat = (row) => bonusCount(row, key)
            top = reduce(stat)

            add(key, stat, top)
          })

          top = null
        }

        add(column, stat, top)
      })
    }

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
        <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.currentEventUrl()}>
          <RelativeDate status />
        </Lockup>
        <Card cutout={hasLeaderboard} center>
          <Avatar cutout outline color={clan.color} foreground={clan.foreground} background={clan.background} />
          <Lockup center reverse kicker={clan.motto} heading={clan.name} />
          <PlatformList platforms={clan.platforms} />
          <StatList stats={stats} top kicker="Top stats" />
          {!hasLeaderboard &&
            <Notification>Leaderboard for this event is being calculated. Please check back later.</Notification>
          }
        </Card>
        {hasLeaderboard &&
          <TabContainer cutout>
            <Tab id="current" name={constants.tense.current}>
              <Leaderboard
                data={leaderboard}
                sorting={{ score: 'DESC', games: 'DESC', name: 'ASC' }}
                prefetch={false}
                stateKey="member"
              />
            </Tab>
            <Tab name="Overall" href={clanUrl} />
          </TabContainer>
        }
      </PageContainer>
    )
  }
}

EventClanTemplate.propTypes = {
  clan: PropTypes.object,
  members: PropTypes.array
}

export default withRouteData(EventClanTemplate)
