import React from 'react'
import { storiesOf } from '@storybook/react'
import SiteContainer from './components/site-container/SiteContainer'
import NotFoundPage from './pages/404'
import BrandingPage from './pages/branding'
import FrequentlyAskedQuestionsPage from './pages/faqs'
import SupportUsPage from './pages/support-us'
import ThanksPage from './pages/thanks'

const constants = require('./utils/constants')

storiesOf('Pages|Static', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Not found', () => <NotFoundPage />)
  .add('Branding', () => <BrandingPage />)
  .add('FAQs', () => <FrequentlyAskedQuestionsPage />)
  .add('Support us', () => <SupportUsPage />)

storiesOf('Pages|Static/Enrollment', module)
  .addParameters({ gutter: { disable: true } })
  .addDecorator(storyFn => <SiteContainer>{storyFn()}</SiteContainer>)
  .add('Failed', () => <ThanksPage />)
  .add('Closed', () => (
    <ThanksPage search={`?message=${constants.enrollment.closed}`} />
  ))
  .add('Successful', () => <ThanksPage search="?success=true" />)
  .add('Opt-out', () => (
    <ThanksPage search={`?message=${constants.enrollment.optOut}`} />
  ))
