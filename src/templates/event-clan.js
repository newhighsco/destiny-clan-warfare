import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
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
import { PlatformList } from '../components/platform/Platform'
import EventMember from '../components/member/EventMember'
import NotFoundPage from '../pages/404'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const statsHelper = require('../utils/stats-helper')
const possessive = require('../utils/grammar').possessive

class EventClanTemplate extends Component {
  render () {
    const { data } = this.props
    console.log(this.props)
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
            '@id': `${process.env.GATSBY_SITE_URL}${urlBuilder.currentEventUrl()}`,
            name: constants.kicker.current
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${process.env.GATSBY_SITE_URL}${urlBuilder.currentEventUrl(data.clan.id.substring(constants.prefix.hash.length))}`,
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
      'ppg',
      'score'
    ]
    const stats = {}
    const hasLeaderboard = leaderboard.length > 0

    if (hasLeaderboard) {
      const reduce = (stat) => leaderboard.reduce((a, b) => stat(a) > stat(b) ? a : b)
      const add = (column, stat, top) => {
        if (top) {
          const value = stat(top)
          const names = leaderboard.filter(row => stat(row) === value).map(row => row.name)

          stats[column] = { stat: `${value}`, label: names }
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
      <Switch>
        <Route
          exact
          path={urlBuilder.currentEventUrl(data.clan.id)}
          render={props => {
            return (
              <PageContainer>
                <Helmet>
                  <title>{title}</title>
                  <meta name="description" content={description} />
                  <meta property="og:title" content={title} />
                  <meta property="og:description" content={description} />
                  <script type="application/ld+json">{JSON.stringify(schema)}</script>
                </Helmet>
                <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.currentEventUrl()}>
                  <RelativeDate status />
                </Lockup>
                <Card cutout={hasLeaderboard} center>
                  <Avatar cutout outline color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
                  <Lockup center reverse kicker={data.clan.motto} heading={data.clan.name} />
                  <PlatformList platforms={data.clan.platforms} />
                  <StatList stats={stats} top />
                  {!hasLeaderboard &&
                    <Notification>Leaderboard for this event is being calculated. Please check back later.</Notification>
                  }
                </Card>
                {hasLeaderboard &&
                  <Leaderboard
                    cutout
                    data={leaderboard}
                    columns={[ 'path', 'platforms', 'name', 'icon', 'tags', 'games', 'wins', 'kills', 'deaths', 'assists', 'bonuses', 'score' ]}
                    sorting={{ score: 'DESC' }}
                  />
                }
              </PageContainer>
            )
          }}
        />
        <Route
          location={location}
          path={urlBuilder.currentEventUrl(data.clan.id, ':profile')}
          render={props => {
            const { location } = props
            const regex = new RegExp(`${urlBuilder.currentEventUrl(data.clan.id)}(.*)/`, 'g')
            const memberId = location.pathname.replace(regex, '$1')
            const member = data.allMember.edges.find(({ node }) => node.id === memberId)

            if (!member) {
              return (
                <NotFoundPage />
              )
            }

            return (
              <EventMember member={member ? member.node : null} />
            )
          }}
        />
        <Route component={NotFoundPage} status={404} />
      </Switch>
    )
  }
}

EventClanTemplate.propTypes = {
  data: PropTypes.object
}

export default EventClanTemplate

export const pageQuery = graphql`
  query EventClanTemplateQuery($id: String!, $clanId: String!) {
    clan(id: { eq: $id }) {
      path
      platforms {
        id
        size
        active
      }
      id
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
        platforms {
          id
          size
          active
        }
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
    allMember(filter: { clanId: { eq: $clanId } }) {
      edges {
        node {
          id
          platforms {
            id
            size
            active
          }
          name
          icon
          tags {
            name
          }
          clanId
          clanName
          clanTag
          leaderboard {
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
          history {
            game {
              path
              isExternal
              result
              type
              map
              endDate
            }
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
    }
  }
`
