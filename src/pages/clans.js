import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import PageContainer from '../components/PageContainer/PageContainer'
import Lockup from '../components/Lockup/Lockup'

class ClansPage extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>Clans</title>
        </Helmet>
        <Lockup heading="All clans" />
        {data.allClan.edges.map(({ node }) => (
          <p>
            <Link to={`/clans/${node.groupId}/`} key={node.groupId}>{node.name}</Link>
          </p>
        ))}
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
    allClan {
      edges {
        node {
          groupId
          name
        }
      }
    }
  }
`
