import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import RelativeDate from '../relative-date/RelativeDate'
import { ModifierList } from '../modifier/Modifier'
import { Button } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'

const constants = require('../../utils/constants')

class CurrentEvent extends Component {
  constructor (props) {
    super(props)

    const { status } = this.props

    this.state = {
      enrollmentOpen: status.enrollmentOpen
    }
  }

  componentDidMount () {
    const enrollmentOpen = JSON.parse(localStorage.getItem('enrollmentOpen'))

    this.setState({ enrollmentOpen: enrollmentOpen })
  }

  render () {
    const { event, element, summary } = this.props
    const { enrollmentOpen } = this.state
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
        <Card cutout={hasLeaderboards} center>
          <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
          <RelativeDate start={event.startDate} end={event.endDate} />
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
}

CurrentEvent.defaultProps = {
  element: 'h1'
}

CurrentEvent.propTypes = {
  event: PropTypes.object,
  status: PropTypes.object,
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
    startDate
    endDate
    ...leaderboardFragment
    ...modifiersFragment
  }
`
