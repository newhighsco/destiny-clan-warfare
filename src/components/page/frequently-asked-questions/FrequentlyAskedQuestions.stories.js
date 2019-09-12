import React from 'react'
import { storiesOf } from '@storybook/react'
import SiteContainer from '../../site-container/SiteContainer'
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions'

storiesOf('Pages|FAQs', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Default', () => <FrequentlyAskedQuestions />)
