import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import RelativeDate from '../relative-date/RelativeDate'
import { ModifierList } from '../modifier/Modifier'
import { MedalList } from '../medal/Medal'
import { Button } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'

const constants = require('../../utils/constants')
const medalBuilder = require('../../utils/medal-builder')

const PreviousEvent = ({ event, element, summary }) => {
  const isCalculated = event.isCalculated
  var largeLeaderboard = []
  var mediumLeaderboard = []
  var smallLeaderboard = []
  var leaderboardColumns = [ 'color', 'foreground', 'background', 'platforms', 'name', 'medal' ]

  if (!summary) {
    largeLeaderboard = medalBuilder.embellishLeaderboard(event.leaderboards.large, constants.division.large)
    mediumLeaderboard = medalBuilder.embellishLeaderboard(event.leaderboards.medium, constants.division.medium)
    smallLeaderboard = medalBuilder.embellishLeaderboard(event.leaderboards.small, constants.division.small)
    leaderboardColumns.push('rank', 'score')
  } else {
    leaderboardColumns.push('division', 'score')
  }

  return (
    <Fragment>
      <Card cutout={isCalculated} center>
        <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
        <RelativeDate start={event.startDate} end={event.endDate} />
        {event.description &&
          <p>{event.description}</p>
        }
        <ModifierList modifiers={event.modifiers} />
        {!summary && isCalculated && event.medals && event.medals.clans &&
          <MedalList medals={event.medals.clans} />
        }
        {!summary && isCalculated && event.medals && event.medals.members &&
          <MedalList medals={event.medals.members} />
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
              <Leaderboard data={event.results} sorting={{ division: 'ASC' }} columns={leaderboardColumns} prefetch={false} />
            </Tab>
          </TabContainer>
        ) : (
          <TabContainer id="results" cutout>
            {largeLeaderboard.length > 0 &&
              <Tab name={constants.division.large}>
                <Leaderboard data={largeLeaderboard} columns={leaderboardColumns} prefetch={false} />
              </Tab>
            }
            {mediumLeaderboard.length > 0 &&
              <Tab name={constants.division.medium}>
                <Leaderboard data={mediumLeaderboard} columns={leaderboardColumns} prefetch={false} />
              </Tab>
            }
            {smallLeaderboard.length > 0 &&
              <Tab name={constants.division.small}>
                <Leaderboard data={smallLeaderboard} columns={leaderboardColumns} prefetch={false} />
              </Tab>
            }
          </TabContainer>
        )
      }
    </Fragment>
  )
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
