import React from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import RelativeDate from '../relative-date/RelativeDate'
import { ModifierList } from '../modifier/Modifier'
import { Button } from '../button/Button'

const constants = require('../../utils/constants')

const FutureEvent = ({ event, element, summary }) => {
  return (
    <Card className="text-center">
      <Lockup center element={element} headingHref={summary && event.path} heading={event.name} />
      <RelativeDate label={constants.relativeDate.future} date={event.startDate} />
      {event.description &&
        <p>{event.description}</p>
      }
      <ModifierList modifiers={event.modifiers} />
      <Button href="/#enroll">Enroll your clan today</Button>
    </Card>
  )
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
    startDate
    ...modifiersFragment
  }
`
