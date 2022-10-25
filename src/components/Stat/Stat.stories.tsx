import React from 'react'
import { Stat, StatList } from '.'

export default { component: Stat }

export const Source = {
  args: { name: 'Name', value: 'Value', label: 'Label' },
  parameters: { chromatic: { disable: true } }
}

export const Empty = { args: { name: 'Kills' } }

export const WithValue = { args: { ...Empty.args, value: 1000 } }

export const WithLabel = { args: { ...WithValue.args, label: 'Player [CLAN]' } }

const values = [
  -1000000,
  -100000,
  -10000,
  -1000,
  -100,
  -10.11,
  -10.1,
  -10,
  -1,
  0,
  1,
  10,
  10.1,
  10.11,
  100,
  10000,
  100000,
  1000000,
  'Zero',
  undefined
]

export const List = {
  render: args => <StatList {...args} />,
  args: {
    kicker: 'Top stats',
    stats: values.map(value => ({ ...Empty.args, value }))
  }
}
