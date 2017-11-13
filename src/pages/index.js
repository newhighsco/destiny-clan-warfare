import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'

class IndexPage extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Lockup kicker="Beta site" heading="Pages" />
        <ul>
          <li>
            <Link to="/clans">Clans</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>
          {data.allEvent.edges.map(({ node }) => (
            <li key={node.id}>
              <Link to={node.path}>{node.name}</Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const data = {
  layout: 'content'
}

export const pageQuery = graphql`
  query IndexPageQuery {
    allEvent(sort: { fields: [ startDate ], order: DESC }) {
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
