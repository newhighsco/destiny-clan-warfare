import React from 'react'
import { storiesOf } from '@storybook/react'
import TextControl from './TextControl'

const commonAttributes = {
  placeholder: 'Placeholder'
}

storiesOf('Components|Text control', module)
  .addParameters({ jest: 'TextControl' })
  .add('Single line', () => <TextControl {...commonAttributes} />)
  .add('Multi line', () => <TextControl {...commonAttributes} multiLine />)
  .add('Warning', () => <TextControl {...commonAttributes} state="warning" />)
  .add('Error', () => <TextControl {...commonAttributes} state="error" />)
  .add('Success', () => <TextControl {...commonAttributes} state="success" />)
  .add('Notice', () => <TextControl {...commonAttributes} state="notice" />)
