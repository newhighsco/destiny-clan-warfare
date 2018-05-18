import React from 'react'
import { storiesOf } from '@storybook/react'
import Status from './Status'

storiesOf('Bungie status', module)
  .add('Offline', () => (
    <Status active />
  ))
