import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import RelativeDate from '../relative-date/RelativeDate'
import { ModifierList } from '../modifier/Modifier'
import { Button } from '../button/Button'

class FutureEvent extends Component {
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

    return (
      <Card center>
        <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
        <RelativeDate start={event.startDate} end={event.endDate} />
        {event.description &&
          <p>{event.description}</p>
        }
        <ModifierList modifiers={event.modifiers} />
        {enrollmentOpen &&
          <Button href="/#enroll">Enroll your clan today</Button>
        }
      </Card>
    )
  }
}

FutureEvent.defaultProps = {
  element: 'h1'
}

FutureEvent.propTypes = {
  event: PropTypes.object,
  element: PropTypes.string,
  summary: PropTypes.bool
}

export default FutureEvent

export const componentFragment = graphql`
  fragment futureEventFragment on Event {
    path
    name
    description
    startDate
    endDate
    ...modifiersFragment
  }
`
