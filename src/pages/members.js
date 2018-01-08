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
    const title = 'Members'
    const description = 'All clan members waging war against other clans in Destiny 2'

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
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
