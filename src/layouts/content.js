import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MasterLayout from './_master'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import BungieStatus from '../components/bungie/Status'

class ContentLayout extends Component {
  render () {
    const { children, data } = this.props

    return (
      <MasterLayout {...this.props}>
        <Header />
        <BungieStatus status={data.bungieStatus} />
        {children()}
        <Footer />
      </MasterLayout>
    )
  }
}

ContentLayout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default ContentLayout

export const pageQuery = graphql`
  query ContentLayoutQuery {
    bungieStatus {
      code
    }
  }
`
