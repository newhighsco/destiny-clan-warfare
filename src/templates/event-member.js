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
import { TagList } from '../components/tag/Tag'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const possessive = require('../utils/possessive')

class EventMemberTemplate extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.member.history.filter(({ game }) => game.path.length && game.type)
    const title = `${data.member.name} | ${constants.kicker.current}`
    const description = `${possessive(data.member.name)} stats and match history in the current ${constants.meta.name} event`
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': `${process.env.SITE_URL}${urlBuilder.eventUrl(data.member.currentEventId)}`,
            name: constants.kicker.current
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${process.env.SITE_URL}${urlBuilder.eventUrl(data.member.currentEventId, data.member.clanId.substring(1))}`,
            name: data.member.clan.name
          }
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id': `${process.env.SITE_URL}${urlBuilder.eventUrl(data.member.currentEventId, data.member.clanId.substring(1), data.member.id)}`,
            name: data.member.name
          }
        }
      ]
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
        <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.eventUrl(data.member.currentEventId)}>
          <RelativeDate label={constants.relativeDate.updated} date={data.member.updatedDate} />
        </Lockup>
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <TagList tags={data.member.tags} className="card__tags" />
          <Lockup center reverse kicker={data.member.clan.name} kickerHref={urlBuilder.eventUrl(data.member.currentEventId, data.member.clanId.substring(1))} heading={data.member.name} />
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
      tags {
        name
      }
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
