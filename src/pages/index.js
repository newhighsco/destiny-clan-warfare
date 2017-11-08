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
        <Lockup kicker="Beta site" heading="All pages" />
        <ul>
          {data.allSitePage.edges.reduce((pages, { node }) => {
            if (!node.path.includes('404')) {
              pages.push(
                <li>
                  <Link to={node.path} key={node.id}>{node.path}</Link>
                </li>
              )
            }
            return pages
          }, [])}
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
    allSitePage(sort: { fields: [ path ] }) {
      edges {
        node {
          id
          path
        }
      }
    }
  }
`
