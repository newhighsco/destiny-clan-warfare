import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider } from '../../contexts/App'
import Enrollment from './Enrollment'

storiesOf('Layout/Enrollment', module)
  .add('Closed', () => (
    <AppProvider
      value={{ apiDisabled: true, enrollmentOpen: false, isEnhanced: true }}
    >
      <Enrollment enrollmentOpen={false} />
    </AppProvider>
  ))
  .add('Open', () => (
    <Fragment>
      <p>Default</p>
      <Enrollment enrollmentOpen />
      <p>Progressively enhanced</p>
      <AppProvider value={{ isEnhanced: true }}>
        <Enrollment enrollmentOpen />
      </AppProvider>
    </Fragment>
  ))
