import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class MembersPage extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allMember.edges.map(edge => edge.node)

    return (
      <PageContainer>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <Card cutout className="text-center">
          <Lockup className="text-center" kicker="All" heading="Members" />
          <div className="temp">
            <p>Search for member</p>
          </div>
        </Card>
        <Leaderboard cutout data={leaderboard} columns={[ 'icon', 'name', 'clan' ]} />
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
    allMember(sort: { fields: [ clanSortable, nameSortable ] }) {
      edges {
        node {
          id
          path
          name
          icon
          clanId
          clan {
            tag
          }
        }
      }
    }
  }
`
