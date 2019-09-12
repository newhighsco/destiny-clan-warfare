import React, { PureComponent } from 'react'
import { firstBy } from 'thenby'
import PropTypes from 'prop-types'
import { withApp } from '../../../contexts/App'
import PageContainer from '../../page-container/PageContainer'
import Card from '../../card/Card'
import { Lockup } from '../../lockup/Lockup'
import Leaderboard from '../../leaderboard/Leaderboard'
import { Filter } from '../../filter/Filter'

const meta = {
  title: 'Clan leaderboard',
  description:
    'All clans battling their way to the top of the Destiny 2 clan leaderboard'
}

const PageClanListing = class extends PureComponent {
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
      activeIndex: null,
      clans,
      suggestions: clans.map(({ name, tag }, index) => ({
        id: index,
        name: `${name} [${tag}]`
      }))
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(tag) {
    this.setState({
      activeIndex: tag.id
    })
  }

  render() {
    const { isEnhanced } = this.props
    const { activeIndex, clans, suggestions } = this.state

    return (
      <PageContainer meta={meta}>
        <Card cutout center>
          <Lockup primary center kicker="Clan" heading="leaderboard" />
          {isEnhanced && (
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

PageClanListing.propTypes = {
  isEnhanced: PropTypes.bool,
  clans: PropTypes.array
}

export default withApp(PageClanListing)
