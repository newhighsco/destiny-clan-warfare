import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Timer from './Timer'

const moment = require('moment')

storiesOf('Timer', module)
  .add('All', () => (
    <Fragment>
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(7, 'd').startOf('d')} />
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(7, 'h').startOf('h')} />
      <Timer start={moment.utc().subtract(7, 'd').startOf('d')} end={moment.utc().subtract(1, 'd').startOf('d')} />
      <Timer start={moment.utc().add(1, 'd').startOf('d')} end={moment.utc().add(7, 'd').startOf('d')} />
    </Fragment>
  ))
