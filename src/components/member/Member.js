import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Head } from 'react-static'
import PageContainer from '../page-container/PageContainer'
import Card from '../card/Card'
import Avatar from '../avatar/Avatar'
import { Lockup } from '../lockup/Lockup'
import { MedalList } from '../medal/Medal'
import { StatList } from '../stat/Stat'
import { Button } from '../button/Button'
import { TagList } from '../tag/Tag'
import Notification from '../notification/Notification'
import Leaderboard from '../leaderboard/Leaderboard'
import { TabContainer, Tab } from '../tab/Tab'
import { PlatformList } from '../platform/Platform'

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const possessive = require('../../utils/grammar').possessive

class Member extends Component {
  render () {
    const { member } = this.props
    const medals = member.medals
    const { lastPlayed, ...stats } = member.totals || {}
    const title = `${member.name} [${member.clanTag}] | Members`
    const description = `${possessive(member.name)} progress in the war against other clans in Destiny 2`
    const kicker = member.clanName
    const kickerHref = urlBuilder.clanUrl(member.clanId.substring(constants.prefix.hash.length))
    const canonical = member.path
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': `${process.env.SITE_URL}${kickerHref}`,
            name: member.clanName
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${process.env.SITE_URL}${canonical}`,
            name: member.name
          }
        }
      ]
    }
    const pastEvents = member.pastEvents || []
    // const pastEvents = [
    //   { id: 16, game: { result: true, path: '/16', type: 'Iron Banner', map: 'Ended 4 days ago' }, medals: medals.slice(1, 2), rank: 7, overall: 140, games: 10, wins: 2, kda: 7.1, bonus1: 10, bonus2: 12, score: 2000000 },
    //   { id: 15, game: { result: true, path: '/15', type: 'Competitive Midweek', map: 'Ended 10 days ago' }, medals: medals.slice(1, 3), rank: 1, overall: 1, games: 102, wins: 72, kda: 107.1, bonus1: 30, bonus2: 5, score: 2000 },
    //   { id: 22, game: { result: true, path: '/22', type: '24 Hour Strike Race', map: 'Ended 40 days ago' }, medals: medals, rank: 72, overall: 4000, games: 120, wins: 24, kda: 700.1, bonus1: 100, bonus2: 1, score: 50500 }
    // ]
    const hasPastEvents = pastEvents.length > 0

    return (
      <PageContainer canonical={canonical}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
        <Card cutout={hasPastEvents} center>
          {member.icon &&
            <Avatar cutout outline icon={member.icon} />
          }
          <TagList tags={member.tags} className="card__tags" />
          <Lockup primary center reverse kicker={kicker} kickerHref={kickerHref} heading={member.name} />
          <PlatformList platforms={member.platforms} />
          <Button href={`${constants.bungie.baseUrl}en/Profile/${constants.bungie.platformDefault}/${member.id}`} target="_blank">View profile</Button>
          <MedalList medals={medals} />
          <StatList stats={stats} />
          {!hasPastEvents &&
            <Notification>Past event statistics coming soon.</Notification>
          }
        </Card>
        {hasPastEvents &&
          <TabContainer cutout>
            <Tab name="Events">
              <Leaderboard data={pastEvents} className="leaderboard--history" />
            </Tab>
          </TabContainer>
        }
      </PageContainer>
    )
  }
}

Member.propTypes = {
  member: PropTypes.object
}

export default Member
