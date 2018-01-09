import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { MedalList } from '../components/medal/Medal'
import { Button } from '../components/button/Button'
import Notification from '../components/notification/Notification'

const moment = require('moment')
const constants = require('../utils/constants')
const possessive = require('../utils/possessive')
const medalBuilder = require('../utils/medal-builder')

class ClanTemplate extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allMember.edges.map(({ node }) => {
      const emptyDate = moment.utc(new Date(0)).format(constants.dateFormat)
      const lastPlayedDate = moment.utc(node.totals.lastPlayed).format(constants.dateFormat)

      return {
        path: lastPlayedDate > emptyDate ? node.path : null,
        name: node.name,
        icon: node.icon,
        tags: node.tags,
        ...node.totals,
        lastPlayed: lastPlayedDate > emptyDate ? lastPlayedDate : constants.blank
      }
    })
    const medals = data.clan.medals.sort((a, b) => medalBuilder.sort(a, b))
    const title = `${data.clan.name} | Clans`
    const description = `${possessive(data.clan.name)} progress battling their way to the top of the Destiny 2 clan leaderboard`

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup primary center reverse kicker={data.clan.motto} heading={data.clan.name} />
          <p dangerouslySetInnerHTML={{ __html: data.clan.description.replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
          <Button href={`${constants.bungie.baseUrl}en/ClanV2?groupid=${data.clan.id}`} target="_blank">Join clan</Button>
          <MedalList medals={medals} />
          <Notification>Past event statistics coming soon</Notification>
        </Card>
        <Leaderboard cutout data={leaderboard} sortBy="score" descending />
      </PageContainer>
    )
  }
}

ClanTemplate.propTypes = {
  data: PropTypes.object
}

export default ClanTemplate

export const pageQuery = graphql`
  query ClanTemplateQuery($id: String!, $clanId: String!) {
    apiStatus {
      bungieCode
    }
    clan(id: { eq: $id }) {
      id
      name
      motto
      description
      color
      foreground {
        color
        icon
      }
      background {
        color
        icon
      }
      ...clanMedalsFragment
    }
    allMember(filter: { clanId: { eq: $clanId } }, sort: { fields: [ nameSortable ] }) {
      edges {
        node {
          path
          name
          icon
          tags {
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
    }
  }
`
