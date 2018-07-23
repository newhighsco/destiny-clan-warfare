import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import { firstBy } from 'thenby'
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
  constructor (props) {
    super(props)

    const { clans } = this.props

    this.state = {
      clans: clans.map(({ medals, ...rest }) => {
        const tiers = { total: 0, '3': 0, '2': 0, '1': 0 }

        medals.map(medal => {
          const count = medal.count

          tiers[medal.tier] += count
          tiers.total += count
        })

        return {
          ...rest,
          ...tiers
        }
      }).sort(firstBy('total', -1).thenBy('3', -1).thenBy('2', -1).thenBy('3', -1))
    }
  }

  render () {
    const { clans } = this.state

    return (
      <PageContainer meta={meta}>
        <Card cutout center>
          <Lockup primary center kicker="Clan medal" heading="leaderboard" />
        </Card>
        <Leaderboard cutout data={clans} columns={[ '3', '2', '1', 'total' ]} />
      </PageContainer>
    )
  }
}

ClansContainer.propTypes = {
  clans: PropTypes.array
}

export default withRouteData(ClansContainer)
