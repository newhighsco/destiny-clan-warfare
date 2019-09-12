import React from 'react'
import { storiesOf } from '@storybook/react'
import SiteContainer from '../../site-container/SiteContainer'
import PageSupportUs from './SupportUs'

storiesOf('Pages|Support us', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Default', () => <PageSupportUs />)
