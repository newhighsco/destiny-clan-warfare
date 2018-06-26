import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import MultiSort from 'multi-sort'
import PageContainer from '../../components/page-container/PageContainer'
import Card from '../../components/card/Card'
import Avatar from '../../components/avatar/Avatar'
import { Lockup } from '../../components/lockup/Lockup'
import Leaderboard from '../../components/leaderboard/Leaderboard'
import { MedalList } from '../../components/medal/Medal'
import { Button, ButtonGroup } from '../../components/button/Button'
import Notification from '../../components/notification/Notification'
import Prose from '../../components/prose/Prose'
import { TabContainer, Tab } from '../../components/tab/Tab'
import { PlatformList } from '../../components/platform/Platform'

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const possessive = require('../../utils/grammar').possessive

class ClanOverallContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { clan, members } = this.props
    const meta = {
      title: `${clan.name} | Clans`,
      description: `${possessive(clan.name)} progress battling their way to the top of the Destiny 2 clan leaderboard`,
      schema: {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': `${process.env.SITE_URL}${urlBuilder.clanRootUrl}`,
              name: 'Clans'
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': `${process.env.SITE_URL}${urlBuilder.clanUrl(clan.id)}`,
              name: clan.name
            }
          }
        ]
      }
    }
    const leaderboard = MultiSort(members.map((member, i) => ({ ...member, ...member.totals, rank: '' })), {
      score: 'DESC',
      lastPlayed: 'DESC'
    })

    this.state = {
      leaderboard,
      meta
    }
  }

  render () {
    const { clan, currentEventId } = this.props
    const { leaderboard, meta } = this.state
    const hasLeaderboard = leaderboard.length > 0
    const previousEvent = []

    return (
      <PageContainer meta={meta}>
        <Card cutout={hasLeaderboard} center>
          <Avatar cutout outline {...clan.avatar} />
          <Lockup primary center reverse kicker={clan.motto} heading={clan.name} />
          <PlatformList platforms={clan.platforms} />
          {clan.description &&
            <Prose>
              <p dangerouslySetInnerHTML={{ __html: clan.description }} />
            </Prose>
          }
          <ButtonGroup>
            <Button href={`${constants.bungie.baseUrl}en/ClanV2?groupid=${clan.id}`} target="_blank">Join clan</Button>
          </ButtonGroup>
          <MedalList medals={clan.medals} kicker="Medals awarded" />
          {!hasLeaderboard &&
            <Notification>Clan roster is being calculated. Please check back later.</Notification>
          }
        </Card>
        {hasLeaderboard &&
          <TabContainer cutout>
            {previousEvent.length > 0 &&
              <Tab id={previousEvent[0].eventId} name={constants.tense.previous}>
                <Leaderboard data={previousEvent} prefetch={false} />
              </Tab>
            }
            <Tab id="overall" name="Overall">
              <Leaderboard data={leaderboard} prefetch={false} />
            </Tab>
            {currentEventId &&
              <Tab name={constants.tense.current} href={urlBuilder.currentEventUrl(clan.id)} />
            }
          </TabContainer>
        }
      </PageContainer>
    )
  }
}

ClanOverallContainer.propTypes = {
  clan: PropTypes.object,
  members: PropTypes.array,
  currentEventId: PropTypes.number
}

export default withRouteData(ClanOverallContainer)
