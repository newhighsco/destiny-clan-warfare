import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import Timer from '../timer/Timer'
import { ModifierList } from '../modifier/Modifier'
import { Button } from '../button/Button'
import { TabContainer, Tab } from '../tab/Tab'
import Leaderboard from '../leaderboard/Leaderboard'
import Notification from '../notification/Notification'
import Prose from '../prose/Prose'

const constants = require('../../utils/constants')

const columns = [
  'rank',
  'overall',
  'active',
  'size',
  'score'
]

class CurrentEvent extends PureComponent {
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

    const leaderboards = event.leaderboards
    const hasLeaderboards = leaderboards.length === constants.divisions.length

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
          {!summary && enrollmentOpen &&
            <Button href={`/${constants.prefix.hash}${constants.prefix.enroll}`}>Enroll your clan today</Button>
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

CurrentEvent.defaultProps = {
  element: 'h1'
}

CurrentEvent.propTypes = {
  event: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default CurrentEvent
