import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container/PageContainer'
import Card from '../card/Card'
import Avatar from '../avatar/Avatar'
import { Lockup } from '../lockup/Lockup'
import { MedalList } from '../medal/Medal'
import { StatList } from '../stat/Stat'
import { Button, ButtonGroup } from '../button/Button'
import { TagList } from '../tag/Tag'
import Leaderboard from '../leaderboard/Leaderboard'
import { TabContainer, Tab } from '../tab/Tab'
import { PlatformList } from '../platform/Platform'
import Notification from '../notification/Notification'

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const possessive = require('../../utils/grammar').possessive

const columns = [
  'rank',
  'overall',
  'games',
  'wins',
  'kd',
  'kda',
  'bonuses',
  'ppg',
  'score'
]

const MemberOverall = class extends PureComponent {
  constructor(props) {
    super(props)

    const { clan, member } = this.props
    const kicker = clan.name
    const kickerHref = urlBuilder.clanUrl(clan.id)
    const canonicalUrl = `${process.env.SITE_URL}${member.path}`
    const meta = {
      kicker,
      kickerHref,
      title: `${member.name} [${clan.tag}] | Members`,
      description: `${possessive(
        member.name
      )} progress in the war against other clans in Destiny 2`,
      canonicalUrl,
      schema: {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': `${process.env.SITE_URL}${kickerHref}`,
              name: kicker
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
    }
    var stats
    const pastEvents = member.pastEvents
    const platformId = member.platforms
      ? member.platforms[0].id
      : constants.bungie.platformDefault

    if (member.totals && member.totals.games > 0)
      stats = { ...stats, ...member.totals }
    if (pastEvents && pastEvents.length > 0) stats.events = pastEvents.length

    this.state = {
      pastEvents,
      platformId,
      stats,
      meta
    }
  }

  render() {
    const { clan, member } = this.props
    const { pastEvents, platformId, stats, meta } = this.state
    const hasLeaderboard = pastEvents && pastEvents.length > 0

    return (
      <PageContainer meta={meta}>
        <Card cutout={hasLeaderboard} center>
          <Avatar cutout outline {...member.avatar} />
          <TagList tags={member.tags} className="card__tags" />
          <Lockup
            primary
            center
            reverse
            kicker={meta.kicker}
            kickerHref={meta.kickerHref}
            heading={member.name}
          />
          <PlatformList platforms={member.platforms} />
          <ButtonGroup>
            <Button
              href={`${constants.bungie.baseUrl}en/Profile/${platformId}/${
                member.id
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View profile
            </Button>
          </ButtonGroup>
          <MedalList medals={member.medals} kicker="Medals awarded" />
          <StatList stats={stats} kicker="Overall stats" />
          {!stats && (
            <Notification>
              Overall stats are being calculated. Participate in at least one
              event to be included.
            </Notification>
          )}
        </Card>
        {hasLeaderboard && (
          <TabContainer cutout>
            <Tab
              name={`${constants.kicker.past}${
                pastEvents.length > 1 ? 's' : ''
              }`}
            >
              <Leaderboard data={pastEvents} columns={columns} extraColumns />
            </Tab>
            {member.hasCurrentTotals && (
              <Tab
                name={constants.tense.current}
                href={urlBuilder.currentEventUrl(clan.id, member.id)}
              />
            )}
          </TabContainer>
        )}
      </PageContainer>
    )
  }
}

MemberOverall.propTypes = {
  clan: PropTypes.object,
  member: PropTypes.object
}

export default MemberOverall
