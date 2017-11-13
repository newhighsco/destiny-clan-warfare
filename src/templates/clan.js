import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class ClanTemplate extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.clan.leaderboard

    return (
      <PageContainer>
        <Helmet>
          <title>{data.clan.name}</title>
        </Helmet>
        <Card className="card--cutout text-center">
          <Avatar className="card__avatar" color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup className="text-center" kicker={data.clan.motto} heading={data.clan.name} />
          <p>Stats, medals, etc. to go here</p>
        </Card>
        <Leaderboard className="leaderboard--cutout" data={leaderboard} sortBy="TotalScore" descending />
      </PageContainer>
    )
  }
}

ClanTemplate.propTypes = {
  data: PropTypes.object
}

export default ClanTemplate

export const pageQuery = graphql`
  query ClanTemplateQuery($id: String!) {
    clan(id: { eq: $id }) {
      id
      name
      tag
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
      leaderboard  {
        Name
        GamesPlayed
        GamesWon
        Kills
        Assists
        Deaths
        TotalScore
      }
    }
    allMember(filter: { clanId: { eq: $id } }, sort: { fields: [ nameSortable ] }) {
      edges {
        node {
          path
          name
          icon
        }
      }
    }
  }
`
