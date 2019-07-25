import React from 'react'
import { storiesOf } from '@storybook/react'
import Sponsorship from './Sponsorship'

storiesOf('Components|Sponsorship', module)
  .addParameters({ jest: 'Sponsorship' })
  .add('Default', () => <Sponsorship />)
