import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Head } from 'react-static'
import PageContainer from '../page-container/PageContainer'
import Card from '../card/Card'
import Avatar from '../avatar/Avatar'
import { Lockup } from '../lockup/Lockup'
import { MedalList } from '../medal/Medal'
import { StatList } from '../stat/Stat'
import { Button, ButtonGroup } from '../button/Button'
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
    const kickerHref = urlBuilder.clanUrl(member.clanId)
    const canonicalUrl = `${process.env.SITE_URL}${member.path}`
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
            '@id': canonicalUrl,
            name: member.name
          }
        }
      ]
    }
    const pastEvents = member.pastEvents || []
    const hasPastEvents = pastEvents.length > 0
    const isMultiColumn = pastEvents.length > 1

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:url" key="ogUrl" content={canonicalUrl} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
        <Card cutout={hasPastEvents} center>
          {member.icon &&
            <Avatar cutout outline icon={member.icon} />
          }
          <TagList tags={member.tags} className="card__tags" />
          <Lockup primary center reverse kicker={kicker} kickerHref={kickerHref} heading={member.name} />
          <PlatformList platforms={member.platforms} />
          <ButtonGroup>
            <Button href={`${constants.bungie.baseUrl}en/Profile/${constants.bungie.platformDefault}/${member.id}`} target="_blank">View profile</Button>
          </ButtonGroup>
          <MedalList medals={medals} kicker="Medals awarded" />
          <StatList stats={stats} kicker="Overall stats" />
          {!hasPastEvents &&
            <Notification>Past event statistics coming soon.</Notification>
          }
        </Card>
        {hasPastEvents &&
          <TabContainer cutout>
            <Tab name={`${constants.kicker.past}${isMultiColumn ? 's' : ''}`}>
              <Leaderboard data={pastEvents} multiColumn={isMultiColumn} />
            </Tab>
            {member.leaderboardVisible &&
              <Tab name={constants.kicker.current} href={urlBuilder.currentEventUrl(member.clanId, member.id)} state={{ member: member }} prefetch={false} />
            }
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
