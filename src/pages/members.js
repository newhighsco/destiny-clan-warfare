import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class MembersPage extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allMember.edges.map(edge => edge.node)

    return (
      <PageContainer>
        <Helmet>
          <title>Members</title>
          <meta name="description" content="All clan members waging war against other clans in Destiny 2" />
        </Helmet>
        <Card cutout className="text-center">
          <Lockup primary center kicker="All" heading="Members" />
        </Card>
        <Leaderboard cutout data={leaderboard} />
      </PageContainer>
    )
  }
}

MembersPage.propTypes = {
  data: PropTypes.object
}

export default MembersPage

export const data = {
  layout: 'content'
}

export const pageQuery = graphql`
  query MembersPageQuery {
    allMember(sort: { fields: [ clanSortable, nameSortable ] }, filter: { totalsVisible: { eq: true } }) {
      edges {
        node {
          path
          name
          clanId
          clan {
            tag
          }
          icon
          tags {
            name
          }
        }
      }
    }
  }
`
