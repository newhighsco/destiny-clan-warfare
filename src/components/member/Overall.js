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

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const possessive = require('../../utils/grammar').possessive

class MemberOverall extends PureComponent {
  constructor (props) {
    super(props)

    const { clan, member } = this.props
    const kicker = clan.name
    const kickerHref = urlBuilder.clanUrl(clan.id)
    const canonicalUrl = `${process.env.SITE_URL}${member.path}`
    const meta = {
      kicker,
      kickerHref,
      title: `${member.name} [${clan.tag}] | Members`,
      description: `${possessive(member.name)} progress in the war against other clans in Destiny 2`,
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

    this.state = {
      meta
    }
  }

  render () {
    const { clan, member } = this.props
    const { meta } = this.state
    const pastEvents = member.pastEvents || []
    const hasLeaderboard = pastEvents.length > 0
    const isMultiColumn = pastEvents.length > 1

    return (
      <PageContainer meta={meta}>
        <Card cutout={hasLeaderboard} center>
          <Avatar cutout outline {...member.avatar} />
          <TagList tags={member.tags} className="card__tags" />
          <Lockup primary center reverse kicker={meta.kicker} kickerHref={meta.kickerHref} heading={member.name} />
          <PlatformList platforms={member.platforms} />
          <ButtonGroup>
            <Button href={`${constants.bungie.baseUrl}en/Profile/${constants.bungie.platformDefault}/${member.id}`} target="_blank">View profile</Button>
          </ButtonGroup>
          <MedalList medals={member.medals} kicker="Medals awarded" />
          {member.totals && member.totals.games > 0 &&
            <StatList stats={member.totals} kicker="Overall stats" />
          }
        </Card>
        {hasLeaderboard &&
          <TabContainer cutout>
            <Tab name={`${constants.kicker.past}${isMultiColumn ? 's' : ''}`}>
              <Leaderboard data={pastEvents} multiColumn={isMultiColumn} />
            </Tab>
            {member.currentTotals && member.currentTotals.games > 0 &&
              <Tab name={constants.tense.current} href={urlBuilder.currentEventUrl(clan.id, member.id)} />
            }
          </TabContainer>
        }
      </PageContainer>
    )
  }
}

MemberOverall.propTypes = {
  clan: PropTypes.object,
  member: PropTypes.object
}

export default MemberOverall
