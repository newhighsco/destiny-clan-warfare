import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import Timer from '../timer/Timer'
import { ModifierList } from '../modifier/Modifier'
import { Button } from '../button/Button'
import Prose from '../prose/Prose'

const constants = require('../../utils/constants')

class EventFuture extends PureComponent {
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

    return (
      <Card center>
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
    )
  }
}

EventFuture.defaultProps = {
  element: 'h1'
}

EventFuture.propTypes = {
  event: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default EventFuture
