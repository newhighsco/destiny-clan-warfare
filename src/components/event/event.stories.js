import React from 'react'
import { storiesOf } from '@storybook/react'
import CurrentEvent from './CurrentEvent'
import FutureEvent from './FutureEvent'
import PreviousEvent from './PreviousEvent'

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
    <CurrentEvent event={{ ...event, startDate: startDate, endDate: endDate }} />
  ))
  .add('Future', () => (
    <FutureEvent event={{ ...event, startDate: endDate }} />
  ))
  .add('Previous', () => (
    <PreviousEvent event={{ ...event, endDate: startDate }} />
  ))
