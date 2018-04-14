import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Timer from './Timer'

const moment = require('moment')

storiesOf('Timer', module)
  .add('Current', () => (
    <Fragment>
      <p>{`state = { active: false }`}</p>
      <Timer active={false} start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(7, 'd').startOf('d')} />
      <p>{`state = { active: true }`}</p>
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(7, 'd').startOf('d')} />
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(48, 'h').add(2, 's')} />
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(24, 'h').add(2, 's')} />
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(7, 'h').startOf('h')} />
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(1, 'h').startOf('h')} />
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(1, 'm').startOf('m')} />
      <Timer start={moment.utc().subtract(1, 'd').startOf('d')} end={moment.utc().add(1, 's')} />
    </Fragment>
  ))
  .add('Future', () => (
    <Fragment>
      <p>{`state = { active: false }`}</p>
      <Timer active={false} start={moment.utc().add(11, 'd').startOf('d')} end={moment.utc().add(17, 'd').startOf('d')} />
      <p>{`state = { active: true }`}</p>
      <Timer start={moment.utc().add(11, 'd').startOf('d')} end={moment.utc().add(17, 'd').startOf('d')} />
      <Timer start={moment.utc().add(48, 'h').add(2, 's')} end={moment.utc().add(7, 'd').startOf('d')} />
      <Timer start={moment.utc().add(24, 'h').add(2, 's')} end={moment.utc().add(7, 'd').startOf('d')} />
      <Timer start={moment.utc().add(1, 'd').startOf('d')} end={moment.utc().add(7, 'd').startOf('d')} />
      <Timer start={moment.utc().add(1, 'h').startOf('h')} end={moment.utc().add(7, 'd').startOf('d')} />
      <Timer start={moment.utc().add(1, 'm').startOf('m')} end={moment.utc().add(7, 'd').startOf('d')} />
    </Fragment>
  ))
  .add('Past', () => (
    <Fragment>
      <p>{`state = { active: false }`}</p>
      <Timer active={false} start={moment.utc().subtract(7, 'd').startOf('d')} end={moment.utc().subtract(1, 'd').startOf('d')} />
      <p>{`state = { active: true }`}</p>
      <Timer start={moment.utc().subtract(7, 'd').startOf('d')} end={moment.utc().subtract(1, 'd').startOf('d')} />
    </Fragment>
  ))
