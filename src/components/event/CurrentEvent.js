import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import RelativeDate from '../relative-date/RelativeDate'
import { ModifierList } from '../modifier/Modifier'
import { Button, ButtonGroup } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'

const constants = require('../../utils/constants')

const CurrentEvent = ({ event, element, summary }) => {
  var largeLeaderboard = event.leaderboards.large
  var mediumLeaderboard = event.leaderboards.medium
  var smallLeaderboard = event.leaderboards.small
  const hasLeaderboards = largeLeaderboard.length > 0 || mediumLeaderboard.length > 0 || smallLeaderboard.length > 0
  const summaryCount = 3

  if (summary) {
    largeLeaderboard = largeLeaderboard.slice(0, summaryCount)
    mediumLeaderboard = mediumLeaderboard.slice(0, summaryCount)
    smallLeaderboard = smallLeaderboard.slice(0, summaryCount)
  }

  return (
    <Fragment>
      <Card cutout={hasLeaderboards} className="text-center">
        <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
        <RelativeDate label={constants.relativeDate.current} date={event.endDate} />
        {event.description &&
          <p>{event.description}</p>
        }
        <ModifierList modifiers={event.modifiers} />
        {!hasLeaderboards &&
          <Notification>Leaderboards for this event are being calculated. Please check back later.</Notification>
        }
        {hasLeaderboards && summary &&
          <ButtonGroup>
            <Button href={`${event.path}#leaderboard`}>View full leaderboard</Button>
          </ButtonGroup>
        }
        {!summary &&
          <ButtonGroup>
            <Button href="/#enroll">Enroll your clan today</Button>
          </ButtonGroup>
        }
      </Card>
      {hasLeaderboards &&
        <TabContainer cutout>
          {largeLeaderboard.length > 0 &&
            <Tab name={constants.division.large}>
              <Leaderboard data={largeLeaderboard} />
            </Tab>
          }
          {mediumLeaderboard.length > 0 &&
            <Tab name={constants.division.medium}>
              <Leaderboard data={mediumLeaderboard} />
            </Tab>
          }
          {smallLeaderboard.length > 0 &&
            <Tab name={constants.division.small}>
              <Leaderboard data={smallLeaderboard} />
            </Tab>
          }
        </TabContainer>
      }
    </Fragment>
  )
}

CurrentEvent.defaultProps = {
  element: 'h1'
}

CurrentEvent.propTypes = {
  event: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default CurrentEvent

export const componentFragment = graphql`
  fragment currentEventFragment on Event {
    updatedDate
    path
    name
    description
    endDate
    ...leaderboardFragment
    ...modifiersFragment
  }
`
