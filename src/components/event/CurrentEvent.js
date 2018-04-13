import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import Timer from '../timer/Timer'
import { ModifierList } from '../modifier/Modifier'
import { Button } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'

class CurrentEvent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      enrollmentOpen: false
    }
  }

  componentDidMount () {
    const enrollmentOpen = JSON.parse(localStorage.getItem('enrollmentOpen'))

    this.setState({ enrollmentOpen: enrollmentOpen })
  }

  render () {
    const { event, element, summary } = this.props
    const { enrollmentOpen } = this.state

    if (!event) return null

    const leaderboards = event.leaderboards ? event.leaderboards : []
    const hasLeaderboards = leaderboards.length === 3

    return (
      <Fragment>
        <Card cutout={hasLeaderboards} center>
          <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
          <Timer start={event.startDate} end={event.endDate} />
          {event.description &&
            <p>{event.description}</p>
          }
          <ModifierList modifiers={event.modifiers} />
          {!hasLeaderboards &&
            <Notification>Leaderboards for this event are being calculated. Please check back later.</Notification>
          }
          {hasLeaderboards && summary &&
            <Button href={`${event.path}#leaderboard`}>View full leaderboard</Button>
          }
          {!summary && enrollmentOpen &&
            <Button href="/#enroll">Enroll your clan today</Button>
          }
        </Card>
        {hasLeaderboards &&
          <TabContainer id={!summary ? 'leaderboard' : null} cutout>
            {leaderboards.map(leaderboard => {
              return (
                <Tab key={leaderboard.name} name={leaderboard.name}>
                  <Leaderboard data={leaderboard.data} />
                </Tab>
              )
            })}
          </TabContainer>
        }
      </Fragment>
    )
  }
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
