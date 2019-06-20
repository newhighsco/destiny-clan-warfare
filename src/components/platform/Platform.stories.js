import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { PlatformList } from './Platform'
import allowedPlatforms from './platforms'

const platforms = allowedPlatforms.map(({ id }) => ({
  id,
  percentage: 10
}))

storiesOf('Components|Platform', module)
  .addParameters({ jest: 'Platform' })
  .add('List', () => (
    <Fragment>
      <PlatformList platforms={platforms} />
      <PlatformList platforms={platforms} size="small" />
    </Fragment>
  ))
