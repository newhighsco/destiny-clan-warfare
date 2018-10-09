import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container/PageContainer'
import Card from '../card/Card'
import Avatar from '../avatar/Avatar'
import { Lockup } from '../lockup/Lockup'
import Leaderboard from '../leaderboard/Leaderboard'
import RelativeDate from '../relative-date/RelativeDate'
import { StatList } from '../stat/Stat'
import { TagList } from '../tag/Tag'
import Notification from '../notification/Notification'
import { TabContainer, Tab } from '../tab/Tab'
import { PlatformList } from '../platform/Platform'

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const possessive = require('../../utils/grammar').possessive

const columns = [
  'kills',
  'assists',
  'deaths',
  'bonuses',
  'score'
]

class MemberCurrent extends PureComponent {
  constructor (props) {
    super(props)

    const { clan, member } = this.props

    const kicker = clan.name
    const kickerHref = urlBuilder.currentEventUrl(clan.id)
    const canonicalUrl = `${process.env.SITE_URL}${urlBuilder.currentEventUrl(clan.id, member.id)}`
    const meta = {
      kicker,
      kickerHref,
      title: `${member.name} [${clan.tag}] | ${constants.kicker.current}`,
      description: `${possessive(member.name)} stats and match history in the current ${constants.meta.name} event`,
      canonicalUrl,
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
              '@id': `${process.env.SITE_URL}${kickerHref}`,
              name: kicker
            }
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@id': canonicalUrl,
              name: member.name
            }
          }
        ]
      }
    }
    const leaderboard = member.matchHistory
    const stats = member.currentTotals && member.currentTotals.games > 0 ? member.currentTotals : null
    const enableMatchHistory = JSON.parse(process.env.ENABLE_MATCH_HISTORY)

    this.state = {
      leaderboard,
      stats,
      enableMatchHistory,
      meta
    }
  }

  render () {
    const { apiStatus, clan, member, matchHistoryLimit } = this.props
    const { leaderboard, stats, enableMatchHistory, meta } = this.state
    const hasLeaderboard = leaderboard.length > 0

    return (
      <PageContainer meta={meta}>
        <Lockup primary center kicker={constants.kicker.current} kickerHref={urlBuilder.currentEventUrl()}>
          <RelativeDate apiStatus={apiStatus} />
        </Lockup>
        <Fragment>
          <Card cutout={hasLeaderboard} center>
            <Avatar cutout outline {...member.avatar} />
            <TagList tags={member.tags} className="card__tags" />
            <Lockup center reverse kicker={meta.kicker} kickerHref={meta.kickerHref} heading={member.name} />
            <PlatformList platforms={member.platforms} />
            <StatList stats={stats} kicker={`${constants.tense.current} stats`} />
            {!hasLeaderboard &&
              <Notification>
                {enableMatchHistory ? (
                  `Match history is being calculated. Please check back later.`
                ) : (
                  `Match history is currently disabled due to high volume.`
                )}
              </Notification>
            }
          </Card>
          {hasLeaderboard &&
            <TabContainer cutout>
              <Tab name={`Last ${matchHistoryLimit} games`}>
                <Leaderboard data={leaderboard} columns={columns} />
              </Tab>
              {member.totals && member.totals.games > 0 &&
                <Tab name="Overall" href={urlBuilder.profileUrl(clan.id, member.id)} prefetch={false} />
              }
            </TabContainer>
          }
        </Fragment>
      </PageContainer>
    )
  }
}

MemberCurrent.propTypes = {
  apiStatus: PropTypes.object,
  clan: PropTypes.object,
  member: PropTypes.object,
  matchHistoryLimit: PropTypes.number
}

export default MemberCurrent
