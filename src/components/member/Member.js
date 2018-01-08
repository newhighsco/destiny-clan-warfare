import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../page-container/PageContainer'
import Card from '../card/Card'
import Avatar from '../avatar/Avatar'
import { Lockup } from '../lockup/Lockup'
import { MedalList } from '../medal/Medal'
import { StatList } from '../stat/Stat'
import { Button } from '../button/Button'
import { TagList } from '../tag/Tag'
import Notification from '../notification/Notification'

const moment = require('moment')
const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const possessive = require('../../utils/possessive')

class Member extends Component {
  render () {
    const { member, status } = this.props
    const totals = member.totals
    const medals = member.medals.sort((a, b) => { return b.tier - a.tier })
    const emptyDate = moment.utc(new Date(0)).format(constants.dateFormat)
    const lastPlayedDate = moment.utc(totals.lastPlayed).format(constants.dateFormat)
    const stats = {
      ...totals,
      lastPlayed: lastPlayedDate
    }
    const title = `${member.name} | Members`
    const description = `${possessive(member.name)} progress in the war against other clans in Destiny 2`

    return (
      <PageContainer status={status}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
        <Card cutout className="text-center">
          {member.icon &&
            <Avatar className="card__avatar" icon={member.icon} />
          }
          <TagList tags={member.tags} className="card__tags" />
          <Lockup primary center reverse kicker={member.clan.name} kickerHref={urlBuilder.clanUrl(member.clanId.substring(constants.prefix.hash.length))} heading={member.name} />
          <Button href={`${constants.bungie.baseUrl}en/Profile/${member.id}`} target="_blank">View profile</Button>
          <MedalList medals={medals} />
          {lastPlayedDate > emptyDate &&
            <StatList stats={stats} />
          }
          <Notification>Past event statistics coming soon</Notification>
        </Card>
      </PageContainer>
    )
  }
}

Member.propTypes = {
  member: PropTypes.object,
  status: PropTypes.object
}

export default Member
