import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'

class MembersPage extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <Lockup kicker="Beta site" heading="All members" />
        <ul>
          {data.allMember.edges.map(({ node }) => (
            <li key={node.id}>
              <Link to={node.path}>{node.name}</Link>
            </li>
          ))}
        </ul>
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
    allMember(sort: { fields: [ clanId, name ] }) {
      edges {
        node {
          id
          path
          name
        }
      }
    }
  }
`
