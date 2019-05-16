import React from 'react'
import { storiesOf } from '@storybook/react'
import Swatch from './Swatch'

storiesOf('Components|Swatch', module)
  .addParameters({ jest: 'Swatch' })
  .add('Default', () => <Swatch name="Red" value="#ff0000" />)
