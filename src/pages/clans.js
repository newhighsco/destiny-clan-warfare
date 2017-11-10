import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class ClansPage extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>Clans</title>
        </Helmet>
        <Lockup kicker="Beta site" heading="Clans" />
        <Leaderboard data={data.allClan.edges} columns={[ 'icon', 'name' ]} />
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
    allClan(sort: { fields: [ nameSortable ] }) {
      edges {
        node {
          id
          path
          name
          color
          foreground {
            color
            icon
          }
          background {
            color
            icon
          }
        }
      }
    }
  }
`
