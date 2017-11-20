import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class ClansPage extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allClan.edges.map(edge => edge.node)

    return (
      <PageContainer>
        <Helmet>
          <title>Clans</title>
        </Helmet>
        <Card cutout className="text-center">
          <Lockup center kicker="All" heading="Clans" />
          <div className="temp">
            <p>Search for clan</p>
          </div>
        </Card>
        <Leaderboard cutout data={leaderboard} columns={[ 'icon', 'name' ]} />
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
