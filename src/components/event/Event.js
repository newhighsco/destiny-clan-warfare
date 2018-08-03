import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import Timer from '../timer/Timer'
import { ModifierList } from '../modifier/Modifier'
import { Button, ButtonGroup } from '../button/Button'
import Prose from '../prose/Prose'

const constants = require('../../utils/constants')

class Event extends PureComponent {
  constructor (props) {
    super(props)

    const { stats } = this.props

    this.state = {
      enrollmentOpen: false,
      statsColumns: stats ? Object.keys(stats) : null
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
    const { enrollmentOpen, statsColumns } = this.state

    const hasLeaderboards = leaderboards && leaderboards.length === constants.divisions.length

    if (!event) return null

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
          {enrollmentOpen &&
            <Button href={`/${constants.prefix.hash}${constants.prefix.enroll}`}>Enroll your clan today</Button>
          }
        </Card>
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
