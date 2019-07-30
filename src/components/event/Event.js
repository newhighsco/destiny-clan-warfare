import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withIsEnhanced } from 'react-progressive-enhancement'
import { withAPIStatus } from '../../contexts/APIStatusContext'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import Timer from '../timer/Timer'
import { ModifierList } from '../modifier/Modifier'
import { MedalList } from '../medal/Medal'
import { Button, ButtonGroup } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'
import Prose from '../prose/Prose'
import { StatList } from '../../components/stat/Stat'
import Sponsor from '../../components/sponsor/Sponsor'
import { Filter } from '../../components/filter/Filter'
import Landmark from '../../components/landmark/Landmark'

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')

const Event = class extends PureComponent {
  constructor(props) {
    super(props)

    const { event, leaderboards, stats } = this.props
    const hasLeaderboards =
      leaderboards && leaderboards.length === constants.divisions.length
    const hasResults = event.isCalculated && hasLeaderboards
    const leaderboardColumns = hasResults
      ? ['rank', 'overall', 'score']
      : ['rank', 'overall', 'active', 'size', 'score']

    this.handleSearch = this.handleSearch.bind(this)

    this.state = {
      statsColumns: stats ? Object.keys(stats) : null,
      hasLeaderboards,
      hasResults,
      leaderboardColumns,
      tabIndex: 0,
      leaderboardIndices: hasLeaderboards
        ? Array(leaderboards.length).fill(null)
        : []
    }
  }

  handleSearch(e) {
    const { leaderboardIndices } = this.state

    const indices = e.id.split(constants.blank)
    const tabIndex = parseInt(indices[0])
    const leaderboardIndex = parseInt(indices[1])

    leaderboardIndices[tabIndex] = leaderboardIndex

    this.setState({
      tabIndex,
      leaderboardIndices: [...leaderboardIndices]
    })
  }

  render() {
    const {
      isEnhanced,
      enrollmentOpen,
      event,
      leaderboards,
      suggestions,
      stats,
      element,
      summary
    } = this.props
    const {
      statsColumns,
      hasLeaderboards,
      hasResults,
      leaderboardColumns,
      tabIndex,
      leaderboardIndices
    } = this.state

    if (!event) return null

    const kicker = event.isCurrent ? 'Top stats' : 'Overall stats'
    const tooltip = event.isCurrent
      ? `Play a minimum of ${
          constants.statsGamesThreshold
        } games to be included.`
      : null
    const summaryType = hasLeaderboards
      ? hasResults
        ? 'results'
        : 'leaderboard'
      : null

    return (
      <Fragment>
        <Card cutout={hasLeaderboards} center>
          <Lockup
            center
            reverse
            element={element}
            heading={event.name}
            headingAttributes={summary && { href: event.path }}
          >
            {event.sponsor && constants.kicker.sponsor}
          </Lockup>
          <Sponsor name={event.sponsor} />
          <Timer start={event.startDate} end={event.endDate} />
          {event.description && (
            <Prose contained>
              <p dangerouslySetInnerHTML={{ __html: event.description }} />
            </Prose>
          )}
          <ModifierList modifiers={event.modifiers} />
          {!summary && (
            <Fragment>
              {summaryType && (
                <Landmark id={summaryType} a11yText={summaryType} />
              )}
              {hasLeaderboards && statsColumns && (
                <Fragment>
                  {statsColumns.length > 0 ? (
                    <StatList
                      stats={stats}
                      columns={statsColumns}
                      top
                      kicker={kicker}
                      tooltip={tooltip}
                    />
                  ) : (
                    <Notification>
                      Top stats for this event are being calculated. {tooltip}
                    </Notification>
                  )}
                </Fragment>
              )}
              {hasResults && event.medals && (
                <MedalList
                  medals={event.medals.clans}
                  kicker="Medals awarded"
                  kickerAttributes={{ href: urlBuilder.clanRootUrl }}
                />
              )}
              {hasLeaderboards && isEnhanced && (
                <Filter
                  kicker="Find clan"
                  placeholder="Enter clan name"
                  suggestions={suggestions}
                  handleAddition={this.handleSearch}
                />
              )}
            </Fragment>
          )}
          {summaryType
            ? summary && (
                <Button
                  href={`${event.path}${constants.prefix.hash}${summaryType}`}
                >
                  View full {summaryType}
                </Button>
              )
            : enrollmentOpen && (
                <ButtonGroup>
                  <Button
                    href={`/${constants.prefix.hash}${constants.prefix.enroll}`}
                  >
                    Enroll your clan today
                  </Button>
                </ButtonGroup>
              )}
          {event.isCurrent && !hasLeaderboards && (
            <Notification>
              Leaderboards for this event are being calculated. Please check
              back later.
            </Notification>
          )}
          {event.isPast && !hasResults && (
            <Notification>
              Results for this event are being calculated. Please check back
              later.
            </Notification>
          )}
        </Card>
        {summary && hasResults ? (
          <TabContainer cutout>
            <Tab name="Winners">
              <Leaderboard data={event.winners} columns={['score']} />
            </Tab>
          </TabContainer>
        ) : (
          hasLeaderboards && (
            <TabContainer cutout activeIndex={tabIndex}>
              {leaderboards &&
                leaderboards.map(({ leaderboard, division }, index) => {
                  return (
                    <Tab
                      key={division.name}
                      name={division.name}
                      title={division.size}
                    >
                      <Leaderboard
                        overall={event.isPast}
                        data={leaderboard}
                        columns={leaderboardColumns}
                        activeIndex={leaderboardIndices[index]}
                      />
                    </Tab>
                  )
                })}
            </TabContainer>
          )
        )}
      </Fragment>
    )
  }
}

Event.defaultProps = {
  element: 'h1'
}

Event.propTypes = {
  isEnhanced: PropTypes.bool,
  enrollmentOpen: PropTypes.bool,
  event: PropTypes.object,
  leaderboards: PropTypes.array,
  suggestions: PropTypes.array,
  stats: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default withIsEnhanced(withAPIStatus(Event))
