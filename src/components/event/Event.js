import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
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

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')

class Event extends PureComponent {
  constructor (props) {
    super(props)

    const { event, leaderboards, stats } = this.props
    const hasLeaderboards = leaderboards && leaderboards.length === constants.divisions.length
    const hasResults = event.isCalculated && hasLeaderboards
    const leaderboardColumns = hasResults ? [ 'rank', 'overall', 'score' ] : [ 'rank', 'overall', 'active', 'size', 'score' ]

    this.state = {
      enrollmentOpen: false,
      statsColumns: stats ? Object.keys(stats) : null,
      hasLeaderboards,
      hasResults,
      leaderboardColumns
    }
  }

  componentDidMount () {
    const { event } = this.props

    if (!event.isPast) {
      const enrollmentOpen = JSON.parse(localStorage.getItem('enrollmentOpen'))

      this.setState({ enrollmentOpen: enrollmentOpen })
    }
  }

  render () {
    const { event, leaderboards, stats, element, summary } = this.props
    const { enrollmentOpen, statsColumns, hasLeaderboards, hasResults, leaderboardColumns } = this.state

    if (!event) return null

    const tooltip = `Play a minimum of ${constants.statsGamesThreshold} games to be included.`
    const summaryType = hasLeaderboards ? (hasResults ? 'results' : 'leaderboard') : null

    return (
      <Fragment>
        <Card cutout={hasLeaderboards} center>
          <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
          <Timer start={event.startDate} end={event.endDate} />
          {event.description &&
            <Prose>
              <p dangerouslySetInnerHTML={{ __html: event.description }} />
            </Prose>
          }
          <ModifierList modifiers={event.modifiers} />
          {!summary &&
            <Fragment>
              {hasLeaderboards && statsColumns &&
                <Fragment>
                  {statsColumns.length > 0 ? (
                    <StatList stats={stats} columns={statsColumns} top kicker="Top stats" tooltip={tooltip} />
                  ) : (
                    <Notification>Top stats for this event are being calculated. {tooltip}</Notification>
                  )}
                </Fragment>
              }
              {hasResults && event.medals &&
                <MedalList medals={event.medals.clans} kicker="Medals awarded" kickerHref={urlBuilder.clanRootUrl} />
              }
            </Fragment>
          }
          {summaryType ? (summary &&
            <Button href={`${event.path}${constants.prefix.hash}${summaryType}`}>View full {summaryType}</Button>
          ) : (enrollmentOpen &&
            <ButtonGroup>
              <Button href={`/${constants.prefix.hash}${constants.prefix.enroll}`}>Enroll your clan today</Button>
            </ButtonGroup>
          )}
          {event.isCurrent && !hasLeaderboards &&
            <Notification>Leaderboards for this event are being calculated. Please check back later.</Notification>
          }
          {event.isPast && !hasResults &&
            <Notification>Results for this event are being calculated. Please check back later.</Notification>
          }
        </Card>
        {summary && hasResults ? (
          <TabContainer cutout>
            <Tab name="Winners">
              <Leaderboard data={event.results} columns={[ 'score' ]} />
            </Tab>
          </TabContainer>
        ) : (hasLeaderboards &&
          <TabContainer id={!summary ? summaryType : null} cutout>
            {leaderboards && leaderboards.map(({ leaderboard, division }) => {
              return (
                <Tab key={division.name} name={division.name} title={division.size}>
                  <Leaderboard data={!summary ? leaderboard : leaderboard.slice(0, 3)} columns={leaderboardColumns} search={!summary} placeholder={`Find clan in ${division.name} leaderboard`} />
                </Tab>
              )
            })}
          </TabContainer>
        )}
      </Fragment>
    )
  }
}

Event.defaultProps = {
  element: 'h1'
}

Event.propTypes = {
  event: PropTypes.object,
  leaderboards: PropTypes.array,
  stats: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default Event
