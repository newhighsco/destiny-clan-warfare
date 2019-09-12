import React from 'react'
import { storiesOf } from '@storybook/react'
import SiteContainer from '../../site-container/SiteContainer'
import PageNotFound from './NotFound'

storiesOf('Pages|404', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Default', () => <PageNotFound />)
