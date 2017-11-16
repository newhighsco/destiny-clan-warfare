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

    return (
      <PageContainer>
        <Helmet>
          <title>{data.clan.name}</title>
        </Helmet>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup reverse className="text-center" kicker={data.clan.motto} heading={data.clan.name} />
          <div className="temp">
            <p>When this page is reach from the current event it will show a new "Top player" block to show who has played most matches etc, and then the event leaderboard below</p>
            <p>It will also show some basic information about the current event (probably modifiers)</p>
          </div>
          <div className="temp">
            <p>When this page is reach from a previous event it will show all the Medals that the clan has ever earned.</p>
            <p>It won't show the event leaderboard below</p>
            <p>It will show a simplified general list of member details (I can create this)</p>
          </div>
        </Card>
        <Leaderboard cutout data={data.clan.leaderboard} sortBy="score" descending />
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
        path
        name
        icon
        games
        wins
        kills
        assists
        deaths
        score
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
