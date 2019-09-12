import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider } from '../../../contexts/App'
import SiteContainer from '../../site-container/SiteContainer'
import Home from './Home'

storiesOf('Pages|Home', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Default', () => (
    <AppProvider value={{ isEnhanced: true }}>
      <Home />
    </AppProvider>
  ))
