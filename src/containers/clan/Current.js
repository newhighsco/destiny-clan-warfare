import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import MultiSort from 'multi-sort'
import PageContainer from '../../components/page-container/PageContainer'
import Card from '../../components/card/Card'
import Avatar from '../../components/avatar/Avatar'
import { Lockup } from '../../components/lockup/Lockup'
import Leaderboard from '../../components/leaderboard/Leaderboard'
import RelativeDate from '../../components/relative-date/RelativeDate'
import { StatList } from '../../components/stat/Stat'
import Notification from '../../components/notification/Notification'
import { PlatformList } from '../../components/platform/Platform'
import { Tab, TabContainer } from '../../components/tab/Tab'

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const possessive = require('../../utils/grammar').possessive

const statsColumns = [
  'games',
  'wins',
  'kd',
  'kda',
  'bonuses',
  'ppg',
  'score'
]
const leaderboardColumns = [
  'rank',
  'games',
  'wins',
  'kills',
  'assists',
  'deaths',
  'bonuses',
  'score'
]

class ClanCurrentContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { clan, members, currentTotals } = this.props
    const meta = {
      title: `${clan.name} | ${constants.kicker.current}`,
      description: `${possessive(clan.name)} clan standings in the current ${constants.meta.name} event`,
      schema: {
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
    }
    const leaderboard = MultiSort(members.map((member, i) => {
      const memberCurrentTotals = currentTotals[member.id]

      return {
        ...member,
        ...memberCurrentTotals
      }
    }), {
      score: 'DESC',
      games: 'DESC',
      name: 'ASC'
    })
    const stats = {}
    var hasStats = true

    if (leaderboard.length > 0) {
      const findTopStat = (stat) => leaderboard.reduce((a, b) => stat(a) > stat(b) ? a : b)
      const addStat = (column, stat, top) => {
        if (top) {
          const value = stat(top)
          const names = leaderboard.filter(row => stat(row) === value).map(({ name }) => name)

          stats[column] = { stat: value, label: names }
        }
      }
      const bonusesKeys = leaderboard[0].bonuses.map(({ shortName }) => shortName)

      statsColumns.map(column => {
        var stat
        var top

        if (column === 'bonuses') {
          const bonusCount = (row, key) => {
            return row.bonuses.find(({ shortName }) => shortName === key).count
          }

          if (hasStats) {
            bonusesKeys.map(key => {
              stat = (row) => bonusCount(row, key)
              top = findTopStat(stat)

              addStat(key, stat, top)
            })
          }

          top = null
        } else {
          stat = (row) => parseInt(row[column])
          top = findTopStat(stat)

          if (column === 'games' && top.games < 0) hasStats = false
          if (hasStats) addStat(column, stat, top)
        }
      })
    }

    this.state = {
      leaderboard,
      stats,
      meta
    }
  }

  render () {
    const { apiStatus, clan } = this.props
    const { leaderboard, stats, meta } = this.state
    const hasLeaderboard = leaderboard.length > 0

    return (
      <PageContainer meta={meta}>
        <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.currentEventUrl()}>
          <RelativeDate apiStatus={apiStatus} />
        </Lockup>
        <Card cutout={hasLeaderboard} center>
          <Avatar cutout outline {...clan.avatar} />
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
              <Leaderboard data={leaderboard} prefetch={false} columns={leaderboardColumns} />
            </Tab>
            <Tab name="Overall" href={clan.path} />
          </TabContainer>
        }
      </PageContainer>
    )
  }
}

ClanCurrentContainer.propTypes = {
  apiStatus: PropTypes.object,
  clan: PropTypes.object,
  members: PropTypes.array,
  currentTotals: PropTypes.object
}

export default withRouteData(ClanCurrentContainer)
