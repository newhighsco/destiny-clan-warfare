import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import { Lockup } from '../components/lockup/Lockup'
import { MedalList } from '../components/medal/Medal'
import { StatList } from '../components/stat/Stat'
import Button from '../components/button/Button'
import { TagList } from '../components/tag/Tag'

const moment = require('moment')
const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const possessive = require('../utils/possessive')

class MemberTemplate extends Component {
  render () {
    const { data } = this.props
    const totals = data.member.totals
    const medals = data.member.medals.sort((a, b) => { return a.tier - b.tier })
    const emptyDate = moment.utc(new Date(0)).format(constants.dateFormat)
    const lastPlayedDate = moment.utc(totals.lastPlayed).format(constants.dateFormat)
    const stats = {
      ...totals,
      lastPlayed: lastPlayedDate
    }

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | Members`}</title>
          <meta name="description" content={`${possessive(data.member.name)} progress in the war against other clans in Destiny 2`} />
        </Helmet>
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <TagList tags={data.member.tags} className="card__tags" />
          <Lockup center reverse kicker={data.member.clan.name} kickerHref={urlBuilder.clanUrl(data.member.clanId)} heading={data.member.name} />
          <Button href={`https://www.bungie.net/en/Profile/${data.member.id}`} target="_blank">View profile</Button>
          <MedalList medals={medals} />
          {lastPlayedDate > emptyDate &&
            <StatList stats={stats} />
          }
        </Card>
      </PageContainer>
    )
  }
}

MemberTemplate.propTypes = {
  data: PropTypes.object
}

export default MemberTemplate

export const pageQuery = graphql`
  query MemberTemplateQuery($id: String!) {
    member(id: { eq: $id }) {
      id
      name
      icon
      tags {
        name
      }
      clanId
      clan {
        name
      }
      totals {
        wins
        kills
        deaths
        assists
        score
        lastPlayed
      }
      ...memberMedalsFragment
    }
  }
`
