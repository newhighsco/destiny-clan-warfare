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
const statsHelper = require('../../utils/stats-helper')
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

    const { clan, members } = this.props
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
    const leaderboard = MultiSort(members.map((member, i) => ({ ...member, ...member.currentTotals, rank: '' })), {
      score: 'DESC',
      games: 'DESC',
      name: 'ASC'
    })
    const stats = {}

    if (leaderboard.length > 0) {
      const findStat = (stat) => leaderboard.reduce((a, b) => stat(a) > stat(b) ? a : b)
      const addStat = (column, stat, top) => {
        if (top) {
          const value = stat(top)
          const names = leaderboard.filter(row => stat(row) === value).map(row => row.name)

          stats[column] = { stat: value, label: names }
        }
      }

      statsColumns.map(column => {
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

        var top = findStat(stat)

        if (column === 'bonuses') {
          const bonusCount = (row, key) => {
            return row.bonuses.find(bonus => bonus.shortName === key).count
          }
          const bonusesKeys = leaderboard[0].bonuses.map(bonus => bonus.shortName)

          bonusesKeys.map(key => {
            stat = (row) => bonusCount(row, key)
            top = findStat(stat)

            addStat(key, stat, top)
          })

          top = null
        }

        addStat(column, stat, top)
      })
    }

    this.state = {
      leaderboard,
      stats,
      meta
    }
  }

  render () {
    const { clan } = this.props
    const { leaderboard, stats, meta } = this.state
    const hasLeaderboard = leaderboard.length > 0

    return (
      <PageContainer meta={meta}>
        <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.currentEventUrl()}>
          <RelativeDate status />
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
  clan: PropTypes.object,
  members: PropTypes.array
}

export default withRouteData(ClanCurrentContainer)
