import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import Timer from '../timer/Timer'
import { ModifierList } from '../modifier/Modifier'
import { Button, ButtonGroup } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'
import Prose from '../prose/Prose'
import { StatList } from '../../components/stat/Stat'

const constants = require('../../utils/constants')

const columns = [
  'rank',
  'overall',
  'active',
  'size',
  'score'
]

class EventCurrent extends PureComponent {
  constructor (props) {
    super(props)

    const { stats } = this.props

    this.state = {
      enrollmentOpen: false,
      statsColumns: stats ? Object.keys(stats) : null
    }
  }

  componentDidMount () {
    const enrollmentOpen = JSON.parse(localStorage.getItem('enrollmentOpen'))

    this.setState({ enrollmentOpen: enrollmentOpen })
  }

  render () {
    const { event, leaderboards, stats, element, summary } = this.props
    const { enrollmentOpen, statsColumns } = this.state

    if (!event) return null

    const hasLeaderboards = leaderboards && leaderboards.length === constants.divisions.length
    const tooltip = `Play a minimum of ${constants.statsGamesThreshold} games to be included.`

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
          {summary && hasLeaderboards &&
            <Button href={`${event.path}#leaderboard`}>View full leaderboard</Button>
          }
          {!summary &&
            <Fragment>
              {enrollmentOpen &&
                <ButtonGroup>
                  <Button href={`/${constants.prefix.hash}${constants.prefix.enroll}`}>Enroll your clan today</Button>
                </ButtonGroup>
              }
              {hasLeaderboards && (
                statsColumns.length > 0 ? (
                  <StatList stats={stats} columns={statsColumns} top kicker="Top stats" tooltip={tooltip} />
                ) : (
                  <Notification>Top stats for this event are being calculated. {tooltip}</Notification>
                )
              )}
            </Fragment>
          }
          {!hasLeaderboards &&
            <Notification>Leaderboards for this event are being calculated. Please check back later.</Notification>
          }
        </Card>
        {hasLeaderboards &&
          <TabContainer id={!summary ? 'leaderboard' : null} cutout>
            {leaderboards.map(({ leaderboard, division }) => {
              return (
                <Tab key={division.name} name={division.name} title={division.size}>
                  <Leaderboard data={!summary ? leaderboard : leaderboard.slice(0, 3)} columns={columns} />
                </Tab>
              )
            })}
          </TabContainer>
        }
      </Fragment>
    )
  }
}

EventCurrent.defaultProps = {
  element: 'h1'
}

EventCurrent.propTypes = {
  event: PropTypes.object,
  leaderboards: PropTypes.array,
  stats: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default EventCurrent
