import React from 'react'
import { storiesOf } from '@storybook/react'
import SiteContainer from '../../site-container/SiteContainer'
import Thanks from './Thanks'

const constants = require('../../../utils/constants')

storiesOf('Pages|Thanks', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Failed', () => <Thanks />)
  .add('Closed', () => (
    <Thanks search={`?message=${constants.enrollment.closed}`} />
  ))
  .add('Successful', () => <Thanks search="?success=true" />)
  .add('Opt-out', () => (
    <Thanks search={`?message=${constants.enrollment.optOut}`} />
  ))
