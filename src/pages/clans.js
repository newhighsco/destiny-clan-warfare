import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class ClansPage extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allClan.edges.map(edge => edge.node)

    return (
      <PageContainer>
        <Helmet>
          <title>Clans</title>
          <meta name="description" content="All clans battling their way to the top of the Destiny 2 clan leaderboard" />
        </Helmet>
        <Card cutout className="text-center">
          <Lockup primary center kicker="All" heading="Clans" />
        </Card>
        <Leaderboard cutout data={leaderboard} />
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
