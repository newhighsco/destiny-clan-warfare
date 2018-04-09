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

const medalBuilder = require('../../utils/medal-builder')

const PreviousEvent = ({ event, element, summary }) => {
  const leaderboards = event.leaderboards ? event.leaderboards.map(({ name, data }) => ({
    name,
    data: medalBuilder.embellishLeaderboard(data, name).map(({ size, active, ...rest }) => ({
      rank: '',
      ...rest
    }))
  })) : []
  const isCalculated = event.isCalculated

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
              <Leaderboard data={event.results} sorting={{ division: 'ASC' }} />
            </Tab>
          </TabContainer>
        ) : (
          <TabContainer id="results" cutout>
            {leaderboards.map(leaderboard => {
              return (
                <Tab key={leaderboard.name} name={leaderboard.name}>
                  <Leaderboard data={leaderboard.data} />
                </Tab>
              )
            })}
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
