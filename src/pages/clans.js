import React, { Component } from 'react'
import { withRouteData, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

const constants = require('../utils/constants')

class ClansPage extends Component {
  render () {
    const { clans } = this.props
    const leaderboard = clans.map(clan => {
      return {
        ...clan,
        clanTag: clan.tag,
        clanId: `${constants.prefix.hash}${clan.id}`
      }
    })
    const title = 'Clans'
    const description = 'All clans battling their way to the top of the Destiny 2 clan leaderboard'
    const leaderboardColumns = [ 'color', 'foreground', 'background', 'platforms', 'name', 'clanTag', 'clanId' ]

    return (
      <PageContainer {...this.props}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Card cutout center>
          <Lockup primary center kicker="All" heading="Clans" />
        </Card>
        <Leaderboard cutout data={leaderboard} columns={leaderboardColumns} prefetch={false} />
      </PageContainer>
    )
  }
}

ClansPage.propTypes = {
  clans: PropTypes.array
}

export default withRouteData(ClansPage)
