import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import { firstBy } from 'thenby'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

const meta = {
  title: 'Clan leaderboard',
  description: 'All clans battling their way to the top of the Destiny 2 clan leaderboard'
}

class ClansContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { clans } = this.props

    this.state = {
      clans: clans.map(({ medalTotals, ...rest }) => {
        return {
          ...rest,
          ...medalTotals,
          game: {
            medals: Object.keys(medalTotals).map(key => {
              const tier = !isNaN(key) ? parseInt(key) : null

              return { tier, count: medalTotals[key] }
            })
          }
        }
      }).sort(firstBy('total', -1).thenBy('3', -1).thenBy('2', -1).thenBy('1', -1))
    }
  }

  render () {
    const { clans } = this.state

    return (
      <PageContainer meta={meta}>
        <Card cutout center>
          <Lockup primary center kicker="Clan" heading="leaderboard" />
        </Card>
        <Leaderboard cutout data={clans} columns={[ 'total' ]} medalsSize="small" />
      </PageContainer>
    )
  }
}

ClansContainer.propTypes = {
  clans: PropTypes.array
}

export default withRouteData(ClansContainer)
