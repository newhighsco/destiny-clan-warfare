import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import Timer from '../timer/Timer'
import { ModifierList } from '../modifier/Modifier'
import { MedalList } from '../medal/Medal'
import { Button } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'
import Prose from '../prose/Prose'

const constants = require('../../utils/constants')

class PreviousEvent extends PureComponent {
  render () {
    const { event, element, summary } = this.props

    if (!event) return null

    const leaderboards = event.leaderboards
    const isCalculated = event.isCalculated && (leaderboards.length === constants.divisions.length)

    return (
      <Fragment>
        <Card cutout={isCalculated} center>
          <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
          <Timer start={event.startDate} end={event.endDate} />
          {event.description &&
            <Prose>
              <p dangerouslySetInnerHTML={{ __html: event.description }} />
            </Prose>
          }
          <ModifierList modifiers={event.modifiers} />
          {!summary && isCalculated && event.medals &&
            <Fragment>
              <MedalList medals={event.medals.clans} kicker="Medals awarded" />
              <MedalList medals={event.medals.members} />
            </Fragment>
          }
          {!isCalculated &&
            <Notification>Results for this event are being calculated. Please check back later.</Notification>
          }
          {isCalculated && summary &&
            <Button href={`${event.path}#results`}>View full results</Button>
          }
        </Card>
        {isCalculated &&
          summary ? (
            <TabContainer cutout>
              <Tab name="Winners">
                <Leaderboard data={event.results} columns={[ 'score' ]} />
              </Tab>
            </TabContainer>
          ) : (
            <TabContainer id="results" cutout>
              {leaderboards.map(({ leaderboard, division }) => {
                return (
                  <Tab key={division.name} name={division.name} title={division.size}>
                    <Leaderboard data={leaderboard} columns={[ 'rank', 'overall', 'score' ]} />
                  </Tab>
                )
              })}
            </TabContainer>
          )
        }
      </Fragment>
    )
  }
}

PreviousEvent.defaultProps = {
  element: 'h1'
}

PreviousEvent.propTypes = {
  event: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default PreviousEvent
