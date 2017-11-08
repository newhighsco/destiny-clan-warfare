import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'

class ClansPage extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>Clans</title>
        </Helmet>
        <Lockup kicker="Beta site" heading="All clans" />
        <ul>
          {data.allClan.edges.map(({ node }) => (
            <li key={node.groupId}>
              <Link to={`/clans/${node.groupId}/`}>{node.name}</Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    )
  }
}

ClansPage.propTypes = {
  data: PropTypes.object
}

export default ClansPage

export const data = {
  layout: 'content'
}

export const pageQuery = graphql`
  query ClansPageQuery {
    allClan(sort: { fields: [ name ] }) {
      edges {
        node {
          groupId
          name
        }
      }
    }
  }
`
