import React from 'react'
import { storiesOf } from '@storybook/react'
import { Filter } from './Filter'

const suggestions = [
  { id: 1, name: 'Apples' },
  { id: 2, name: 'Pears' },
  { id: 3, name: 'Bananas' },
  { id: 4, name: 'Mangos' },
  { id: 5, name: 'Lemons' },
  { id: 6, name: 'Apricots' }
]

const tags = suggestions.slice(0, 2)

storiesOf('Layout', module).add('Filter', () => (
  <Filter
    kicker="Filter"
    suggestions={suggestions}
    tags={tags}
    handleAddition={() => {}}
    handleDelete={() => {}}
  />
))
