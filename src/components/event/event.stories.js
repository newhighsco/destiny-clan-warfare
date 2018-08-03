import React from 'react'
import { storiesOf } from '@storybook/react'
import Event from './Event'
import EventCurrent from './Current'
import EventFuture from './Future'
import EventPrevious from './Previous'

const moment = require('moment')

const startDate = moment.utc().subtract(1, 'd').startOf('d')
const endDate = moment.utc().add(7, 'd').startOf('d')
const event = {
  path: '/',
  name: 'Competitive',
  description: 'Score points by completing matches in the Competitive playlist',
  modifiers: [
    { name: 'Merciless', bonus: 50, scoringModifier: true },
    { name: 'Abuse of power', bonus: -150, scoringModifier: true },
    { name: 'Perfection', bonus: 3 }
  ]
}

storiesOf('Events', module)
  .add('Current', () => (
    <div>
      <EventCurrent event={{ ...event, startDate: startDate, endDate: endDate }} />
      <br />
      <Event event={{ ...event, isCurrent: true, startDate: startDate, endDate: endDate }} />
    </div>
  ))
  .add('Future', () => (
    <div>
      <EventFuture event={{ ...event, startDate: endDate }} />
      <br />
      <Event event={{ ...event, isFuture: true, startDate: endDate }} />
    </div>
  ))
  .add('Previous', () => (
    <div>
      <EventPrevious event={{ ...event, endDate: startDate }} />
      <br />
      <Event event={{ ...event, isPast: true, endDate: startDate }} />
    </div>
  ))
