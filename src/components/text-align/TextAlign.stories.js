import React from 'react'
import { storiesOf } from '@storybook/react'
import TextAlign from './TextAlign'

const content = (
  <p>
    A Chinese tale tells of some men sent to harm a young girl who, upon seeing
    her beauty, become her protectors rather than her violators. That's how I
    felt seeing the Earth for the first time. I could not help but love and
    cherish her.
  </p>
)

storiesOf('Components|Text align', module)
  .addParameters({ jest: 'TextAlign' })
  .add('Default', () => <TextAlign>{content}</TextAlign>)
  .add('Left aligned text', () => <TextAlign left>{content}</TextAlign>)
  .add('Right aligned text', () => <TextAlign right>{content}</TextAlign>)
  .add('Center aligned text', () => <TextAlign center>{content}</TextAlign>)
  .add('Justified text', () => <TextAlign justify>{content}</TextAlign>)
