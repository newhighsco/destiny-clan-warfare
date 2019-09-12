import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider } from '../../../contexts/App'
import SiteContainer from '../../site-container/SiteContainer'
import PageEventListing from './Listing'

storiesOf('Pages|Event', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('List', () => (
    <AppProvider value={{ isEnhanced: true }}>
      <PageEventListing />
    </AppProvider>
  ))
