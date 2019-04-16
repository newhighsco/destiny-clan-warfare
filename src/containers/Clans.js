import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import { firstBy } from 'thenby'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { Filter } from '../components/filter/Filter'

const meta = {
  title: 'Clan leaderboard',
  description:
    'All clans battling their way to the top of the Destiny 2 clan leaderboard'
}

class ClansContainer extends PureComponent {
  constructor(props) {
    super(props)

    var { clans } = this.props

    clans = clans
      .map(({ medalTotals, ...rest }) => {
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
      })
      .sort(
        firstBy('total', -1)
          .thenBy('3', -1)
          .thenBy('2', -1)
          .thenBy('1', -1)
      )

    this.state = {
      active: false,
      activeIndex: null,
      clans,
      suggestions: clans.map(({ name, tag }, index) => ({
        id: index,
        name: `${name} [${tag}]`
      }))
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  handleSearch(tag) {
    this.setState({
      activeIndex: tag.id
    })
  }

  render() {
    const { active, activeIndex, clans, suggestions } = this.state

    return (
      <PageContainer meta={meta}>
        <Card cutout center>
          <Lockup primary center kicker="Clan" heading="leaderboard" />
          {active && (
            <Filter
              kicker="Find clan"
              placeholder="Enter clan name"
              suggestions={suggestions}
              handleAddition={this.handleSearch}
            />
          )}
        </Card>
        <Leaderboard
          cutout
          data={clans}
          activeIndex={activeIndex}
          columns={['total']}
          medalsSize="small"
        />
      </PageContainer>
    )
  }
}

ClansContainer.propTypes = {
  clans: PropTypes.array
}

export default withRouteData(ClansContainer)
