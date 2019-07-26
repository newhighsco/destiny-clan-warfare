import React from 'react'
import { storiesOf } from '@storybook/react'
import { SwatchList } from './Swatch'

storiesOf('Components|Swatch', module)
  .addParameters({ jest: 'Swatch' })
  .add('List', () => <SwatchList />)
