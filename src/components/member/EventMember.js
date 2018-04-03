import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Head } from 'react-static'
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

class EventMember extends Component {
  render () {
    const { member } = this.props
    const leaderboard = member.history ? member.history.filter(({ game }) => game.path.length && game.type) : null
    const enableMatchHistory = JSON.parse(process.env.ENABLE_MATCH_HISTORY)
    const hasLeaderboard = leaderboard && leaderboard.length > 0
    const title = `${member.name} [${member.clanTag}] | ${constants.kicker.current}`
    const description = `${possessive(member.name)} stats and match history in the current ${constants.meta.name} event`
    const canonical = urlBuilder.currentEventUrl(member.clanId.substring(constants.prefix.hash.length), member.id)
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
            '@id': `${process.env.SITE_URL}${urlBuilder.currentEventUrl(member.clanId.substring(constants.prefix.hash.length))}`,
            name: member.clanName
          }
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id': `${process.env.SITE_URL}${canonical}`,
            name: member.name
          }
        }
      ]
    }

    return (
      <PageContainer canonical={canonical}>
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
        <Fragment>
          <Card cutout={hasLeaderboard} center>
            {member.icon &&
              <Avatar cutout outline icon={member.icon} />
            }
            <TagList tags={member.tags} className="card__tags" />
            <Lockup center reverse kicker={member.clanName} kickerHref={urlBuilder.currentEventUrl(member.clanId.substring(constants.prefix.hash.length))} heading={member.name} />
            <PlatformList platforms={member.platforms} />
            <StatList stats={member.leaderboard} />
            {!hasLeaderboard &&
              <Notification>
                {enableMatchHistory ? (
                  `Match history is being calculated. Please check back later.`
                ) : (
                  `Match history is currently disabled.`
                )}
              </Notification>
            }
          </Card>
          {hasLeaderboard &&
            <TabContainer cutout>
              <Tab name={`Last ${constants.matchHistoryLimit} games`}>
                <Leaderboard data={leaderboard} />
              </Tab>
            </TabContainer>
          }
        </Fragment>
      </PageContainer>
    )
  }
}

EventMember.propTypes = {
  member: PropTypes.object
}

export default EventMember
