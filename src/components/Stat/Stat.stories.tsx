import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Stat, StatList } from '@components/Stat'

export default {
  title: 'Components/Stat',
  component: Stat
} as ComponentMeta<typeof Stat>

const Template: ComponentStory<typeof Stat> = args => <Stat {...args} />

export const source = Template.bind({})

source.args = {
  name: 'Name',
  value: 'Value',
  label: 'Label'
}

export const empty = Template.bind({})
empty.args = {
  name: 'Kills'
}

export const withValue = Template.bind({})

withValue.args = {
  ...empty.args,
  value: 1000
}

export const withLabel = Template.bind({})

withLabel.args = {
  ...withValue.args,
  label: 'Player [CLAN]'
}

const List: ComponentStory<typeof StatList> = args => <StatList {...args} />

export const list = List.bind({})

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
  'Zero'
]

list.args = {
  kicker: 'Top stats',
  stats: values.map(value => ({ ...empty.args, value }))
}
