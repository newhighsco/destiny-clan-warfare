import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { PlatformList } from './Platform'

const platforms = [
  { id: 1, percentage: 33.3 },
  { id: 2, percentage: 33.3 },
  { id: 4, percentage: 33.3 }
]

storiesOf('Platform', module)
  .add('List', () => (
    <Fragment>
      <PlatformList platforms={platforms} />
      <PlatformList platforms={platforms} size="small" />
    </Fragment>
  ))
