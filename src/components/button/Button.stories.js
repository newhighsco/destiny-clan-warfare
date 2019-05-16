import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ButtonGroup } from './Button'

const commonAttributes = {
  href: '#'
}

storiesOf('Components|Button', module)
  .addParameters({ jest: 'Button' })
  .add('Regular', () => <Button {...commonAttributes}>Regular button</Button>)
  .add('Small', () => (
    <Button size="small" {...commonAttributes}>
      Small button
    </Button>
  ))
  .add('Solid', () => (
    <Button solid {...commonAttributes}>
      Solid button
    </Button>
  ))
  .add('Group', () => (
    <ButtonGroup>
      <Button {...commonAttributes}>First button</Button>
      <Button {...commonAttributes}>Second button</Button>
    </ButtonGroup>
  ))
