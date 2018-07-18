import React from 'react'
import { storiesOf } from '@storybook/react'
import { TagList } from './Tag'

const tags = [
  { name: 'Beta Tester' },
  { name: 'Creator' },
  { name: 'Insider' },
  { name: 'Invalid' }
]

storiesOf('Tag', module)
  .add('List', () => (
    <TagList tags={tags} />
  ))
