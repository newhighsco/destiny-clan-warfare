import React from 'react'
import { storiesOf } from '@storybook/react'
import Swatch from './Swatch'

storiesOf('Swatch', module)
  .add('Default', () => (
    <Swatch name="Red" value="#ff0000" />
  ))
