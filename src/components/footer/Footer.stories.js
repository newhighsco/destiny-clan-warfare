import React from 'react'
import { storiesOf } from '@storybook/react'
import Footer from './Footer'

storiesOf('Layout', module)
  .addParameters({ jest: 'Footer' })
  .add('Footer', () => <Footer />)
