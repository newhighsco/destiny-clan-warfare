import React from 'react'
import { storiesOf } from '@storybook/react'
import TextButton from './TextButton'

const commonAttributes = {
  href: '#'
}

storiesOf('Components|Text button', module)
  .addParameters({ jest: 'TextButton' })
  .add('Default', () => (
    <TextButton {...commonAttributes}>Text button</TextButton>
  ))
