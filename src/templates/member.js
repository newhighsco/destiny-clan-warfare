import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { MedalList } from '../components/medal/Medal'
import Button from '../components/button/Button'

const moment = require('moment')
const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

class MemberTemplate extends Component {
  render () {
    const { data } = this.props
    const totals = data.member.totals
    const emptyDate = moment.utc(new Date(0)).format(constants.dateFormat)
    const lastPlayedDate = moment.utc(totals.lastPlayed).format(constants.dateFormat)
    const leaderboard = [ {
      ...totals,
      lastPlayed: lastPlayedDate
    } ]

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | Members`}</title>
        </Helmet>
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <Lockup center reverse kicker={data.member.clan.name} kickerHref={urlBuilder.clanUrl(data.member.clanId)} heading={data.member.name} />
          <Button key="button" href={`https://www.bungie.net/en/Profile/${data.member.id}`} target="_blank">View profile</Button>
          <MedalList key="medals" medals={[ { tier: 1, description: 'TBC' }, { tier: 2, description: 'TBC' }, { tier: 3, description: 'TBC' } ]} />
        </Card>
        {lastPlayedDate > emptyDate &&
          <Leaderboard cutout data={leaderboard} />
        }
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
    }
  }
`
