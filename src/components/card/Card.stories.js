import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Card from './Card'
import Avatar from '../avatar/Avatar'

const content = (
  <p>
    A Chinese tale tells of some men sent to harm a young girl who, upon seeing
    her beauty, become her protectors rather than her violators. That's how I
    felt seeing the Earth for the first time. I could not help but love and
    cherish her.
  </p>
)

storiesOf('Components|Card', module)
  .addParameters({ jest: 'Card' })
  .add('Left aligned text', () => <Card>{content}</Card>)
  .add('Center aligned text', () => <Card center>{content}</Card>)
  .add('With cut-out sibling', () => (
    <Fragment>
      <Card cutout>{content}</Card>
      <Avatar cutout />
    </Fragment>
  ))
