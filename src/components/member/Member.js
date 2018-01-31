import React, { Component, Fragment } from 'react'
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
    const medals = member.medals
    const emptyDate = moment.utc(new Date(0)).format(constants.dateFormat)
    const lastPlayedDate = moment.utc(totals.lastPlayed).format(constants.dateFormat)
    const stats = {
      ...totals,
      lastPlayed: lastPlayedDate
    }
    const title = `${member.name} | Members`
    const description = `${possessive(member.name)} progress in the war against other clans in Destiny 2`
    const kicker = member.clan.name
    const kickerHref = urlBuilder.clanUrl(member.clanId.substring(constants.prefix.hash.length))
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': `${process.env.GATSBY_SITE_URL}${kickerHref}`,
            name: member.clan.name
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${process.env.GATSBY_SITE_URL}${member.path}`,
            name: member.name
          }
        }
      ]
    }

    return (
      <PageContainer status={status}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Card className="text-center">
          {member.icon &&
            <Avatar className="card__avatar" icon={member.icon} />
          }
          <TagList tags={member.tags} className="card__tags" />
          <Lockup primary center reverse kicker={kicker} kickerHref={kickerHref} heading={member.name} />
          <Button href={`${constants.bungie.baseUrl}en/Profile/${member.id}`} target="_blank">View profile</Button>
          <MedalList medals={medals} />
          {lastPlayedDate > emptyDate &&
            <Fragment>
              <StatList stats={stats} />
              <Notification>Past event statistics coming soon</Notification>
            </Fragment>
          }
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
