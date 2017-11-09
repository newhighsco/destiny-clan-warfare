import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class MembersPage extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <Lockup kicker="Beta site" heading="Members" />
        <Leaderboard data={data.allMember.edges} columns={[ 'icon', 'name' ]} />
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
    allMember(sort: { fields: [ clanId, nameSortable ] }) {
      edges {
        node {
          id
          path
          name
          icon
        }
      }
    }
  }
`
