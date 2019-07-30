import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Enrollment from './Enrollment'

storiesOf('Layout/Enrollment', module)
  .add('Closed', () => <Enrollment />)
  .add('Open', () => (
    <Fragment>
      <p>Default</p>
      <Enrollment enrollmentOpen />
      <p>Progressively enhanced</p>
      <Enrollment enrollmentOpen isEnhanced />
    </Fragment>
  ))
