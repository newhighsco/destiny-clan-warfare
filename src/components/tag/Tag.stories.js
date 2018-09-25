import React from 'react'
import { storiesOf } from '@storybook/react'
import { firstBy } from 'thenby'
import { allowedTags, TagList } from './Tag'

const tags = [
  ...allowedTags,
  { name: 'Invalid' }
].sort(firstBy('tier'))

storiesOf('Tag', module)
  .add('List', () => (
    <TagList tags={tags} />
  ))
