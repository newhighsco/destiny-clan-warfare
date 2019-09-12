import React from 'react'
import { storiesOf } from '@storybook/react'
import SiteContainer from '../../site-container/SiteContainer'
import PageThanks from './Thanks'

const constants = require('../../../utils/constants')

storiesOf('Pages|Thanks', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Failed', () => <PageThanks />)
  .add('Closed', () => (
    <PageThanks search={`?message=${constants.enrollment.closed}`} />
  ))
  .add('Successful', () => <PageThanks search="?success=true" />)
  .add('Opt-out', () => (
    <PageThanks search={`?message=${constants.enrollment.optOut}`} />
  ))
