import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

const meta = {
  title: 'Clans',
  description: 'All clans battling their way to the top of the Destiny 2 clan leaderboard'
}

class ClansContainer extends PureComponent {
  render () {
    const { clans } = this.props

    return (
      <PageContainer meta={meta}>
        <Card cutout center>
          <Lockup primary center kicker="All" heading="Clans" />
        </Card>
        <Leaderboard cutout data={clans} />
      </PageContainer>
    )
  }
}

ClansContainer.propTypes = {
  clans: PropTypes.array
}

export default withRouteData(ClansContainer)
