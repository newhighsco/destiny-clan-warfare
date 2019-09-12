import React from 'react'
import { storiesOf } from '@storybook/react'
import SiteContainer from '../../site-container/SiteContainer'
import PageBranding from './Branding'

storiesOf('Pages|Branding', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Default', () => <PageBranding />)
