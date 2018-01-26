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

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const kda = require('../utils/kda')
const possessive = require('../utils/possessive')

class EventClanTemplate extends Component {
  render () {
    var bonuses = []
    const { data } = this.props
    const leaderboard = data.clan.leaderboard
      .filter(({ games }) => games > 0)
      .map(item => {
        item.modifiers.map(modifier => {
          const label = modifier.shortName

          if (modifier.scoringModifier) {
            item[label] = modifier.count

            if (bonuses.indexOf(label) === -1) bonuses.push(label)
          }
        })

        const { modifiers, score, ...columns } = item

        return {
          ...columns,
          score
        }
      })
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
      'kills',
      'deaths',
      'assists',
      ...bonuses,
      'score'
    ]
    const stats = {}

    if (leaderboard.length) {
      columns.map(column => {
        var top = leaderboard.reduce((a, b) => (a[column] > b[column]) ? a : b)
        var keyPrefix = constants.prefix.most
        var key = column
        var stat = (top) => top[column]

        if (column === 'kills') {
          top = leaderboard.reduce((a, b) => (kda(a) > kda(b)) ? a : b)
          key = 'KDA'
          stat = (top) => kda(top)
        }

        if (column.match(/(assists|deaths)/)) {
          top = null
        }

        if (column.match(/(kills|score)/)) {
          keyPrefix = constants.prefix.highest
        }

        if (top) stats[`${keyPrefix} ${key}`] = { stat: `${stat(top)}`, label: top.name }
      })
    }

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.eventUrl(data.clan.currentEventId)}>
          <RelativeDate label={constants.relativeDate.updated} date={data.clan.updatedDate} />
        </Lockup>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup center reverse kicker={data.clan.motto} heading={data.clan.name} />
          <StatList stats={stats} />
        </Card>
        <Leaderboard cutout data={leaderboard} columns={[ 'icon', 'name', 'path', ...columns ]} sorting={{ score: 'DESC' }} />
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
    apiStatus {
      bungieCode
    }
    clan(id: { eq: $id }) {
      path
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
        modifiers {
          shortName
          count
          scoringModifier
        }
      }
    }
  }
`
