import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class MemberTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{data.member.name}</title>
        </Helmet>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" icon={data.member.icon} />
          <Lockup reverse className="text-center" kicker={data.clan.name} kickerHref={data.clan.path} heading={data.member.name} />
          <p>Stats, medals, etc. to go here</p>
        </Card>
        <Leaderboard cutout data={data.member.history} />
      </PageContainer>
    )
  }
}

MemberTemplate.propTypes = {
  data: PropTypes.object
}

export default MemberTemplate

export const pageQuery = graphql`
  query MemberTemplateQuery($id: String!, $clanId: String!) {
    member(id: { eq: $id }) {
      name
      icon
      history {
        win
        kills
        assists
        deaths
        score
      }
    }
    clan(id: { eq: $clanId }) {
      path
      name
    }
  }
`
