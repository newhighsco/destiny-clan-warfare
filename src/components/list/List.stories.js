import React from 'react'
import { storiesOf } from '@storybook/react'
import List from './List'

const items = [
  <li key="1">Item 1</li>,
  <li key="2">Item 2</li>,
  <li key="3">Item 3</li>
]

storiesOf('Components|List', module)
  .addParameters({ jest: 'List' })
  .add('Default', () => <List>{items}</List>)
  .add('Ordered', () => <List ordered>{items}</List>)
  .add('Unstyled', () => <List unstyled>{items}</List>)
  .add('Inline', () => <List inline>{items}</List>)
  .add('Comma-separated', () => <List commaSeparated>{items}</List>)
  .add('Inline, comma-separated', () => (
    <List inline commaSeparated>
      {items}
    </List>
  ))
