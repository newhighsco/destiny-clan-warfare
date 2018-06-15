import React from 'react'
import { storiesOf } from '@storybook/react'
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
    <EventCurrent event={{ ...event, startDate: startDate, endDate: endDate }} />
  ))
  .add('Future', () => (
    <EventFuture event={{ ...event, startDate: endDate }} />
  ))
  .add('Previous', () => (
    <EventPrevious event={{ ...event, endDate: startDate }} />
  ))
