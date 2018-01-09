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
    const title = 'Clans'
    const description = 'All clans battling their way to the top of the Destiny 2 clan leaderboard'

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
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

export const pageQuery = graphql`
  query ClansPageQuery {
    apiStatus {
      bungieCode
    }
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
