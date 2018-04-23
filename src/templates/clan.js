import React, { Component } from 'react'
import { withRouteData, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { MedalList } from '../components/medal/Medal'
import { Button } from '../components/button/Button'
import Notification from '../components/notification/Notification'
import Prose from '../components/prose/Prose'
import { TabContainer, Tab } from '../components/tab/Tab'
import { PlatformList } from '../components/platform/Platform'

const moment = require('moment')
const constants = require('../utils/constants')
const possessive = require('../utils/grammar').possessive

class ClanTemplate extends Component {
  render () {
    const { clan, members } = this.props
    const previousLeaderboard = clan.previousLeaderboard.filter(member => member).map(member => {
      const hasPlayed = member.games > 0

      return {
        path: hasPlayed ? member.path : null,
        platforms: member.platforms,
        name: member.name,
        icon: member.icon,
        tags: member.tags,
        rank: hasPlayed ? '' : null,
        games: hasPlayed ? member.games : null,
        wins: hasPlayed ? member.wins : null,
        kills: hasPlayed ? member.kills : null,
        assists: hasPlayed ? member.assists : null,
        deaths: hasPlayed ? member.deaths : null,
        bonuses: member.bonuses,
        score: hasPlayed ? member.score : null,
        member: members.find(({ id }) => id === member.id)
      }
    })
    const totals = members.map(member => {
      const emptyDate = moment.utc(new Date(0)).format(constants.format.date)
      const lastPlayedDate = moment.utc(member.totals.lastPlayed).format(constants.format.date)
      const hasPlayed = member.totals.games > 0

      return {
        path: hasPlayed ? member.path : null,
        platforms: member.platforms,
        name: member.name,
        icon: member.icon,
        tags: member.tags,
        rank: hasPlayed ? '' : null,
        wins: hasPlayed ? member.totals.wins : null,
        kills: hasPlayed ? member.totals.kills : null,
        assists: hasPlayed ? member.totals.assists : null,
        deaths: hasPlayed ? member.totals.deaths : null,
        score: hasPlayed ? member.totals.score : null,
        lastPlayed: lastPlayedDate > emptyDate ? lastPlayedDate : constants.blank,
        member: member
      }
    })
    const hasLeaderboards = previousLeaderboard.length > 0 || totals.length > 0
    const medals = clan.medals
    const title = `${clan.name} | Clans`
    const description = `${possessive(clan.name)} progress battling their way to the top of the Destiny 2 clan leaderboard`

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Card cutout={hasLeaderboards} center>
          <Avatar cutout outline color={clan.color} foreground={clan.foreground} background={clan.background} />
          <Lockup primary center reverse kicker={clan.motto} heading={clan.name} />
          <PlatformList platforms={clan.platforms} />
          {clan.description &&
            <Prose>
              <p dangerouslySetInnerHTML={{ __html: clan.description }} />
            </Prose>
          }
          <Button href={`${constants.bungie.baseUrl}en/ClanV2?groupid=${clan.id}`} target="_blank">Join clan</Button>
          <MedalList medals={medals} />
          {!hasLeaderboards &&
            <Notification>Clan roster is being calculated. Please check back later.</Notification>
          }
        </Card>
        {hasLeaderboards &&
          <TabContainer cutout>
            {previousLeaderboard.length > 0 &&
              <Tab id={previousLeaderboard[0].eventId} name={constants.kicker.last}>
                <Leaderboard
                  data={previousLeaderboard}
                  sorting={{ score: 'DESC', games: 'DESC', name: 'ASC' }}
                  prefetch={false}
                  stateKey="member"
                />
              </Tab>
            }
            {totals.length > 0 &&
              <Tab name="Overall">
                <Leaderboard
                  data={totals}
                  sorting={{ score: 'DESC', lastPlayed: 'DESC' }}
                  prefetch={false}
                  stateKey="member"
                />
              </Tab>
            }
          </TabContainer>
        }
      </PageContainer>
    )
  }
}

ClanTemplate.propTypes = {
  clan: PropTypes.object,
  members: PropTypes.array
}

export default withRouteData(ClanTemplate)
