import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MasterLayout from './_master'

class IndexLayout extends Component {
  render () {
    const { children } = this.props

    return (
      <MasterLayout {...this.props}>
        {children()}
      </MasterLayout>
    )
  }
}

IndexLayout.propTypes = {
  children: PropTypes.func
}

export default IndexLayout

export const pageQuery = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
