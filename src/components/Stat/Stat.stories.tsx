import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Stat, StatList } from '@components/Stat'

export default {
  title: 'Components/Stat',
  component: Stat
} as ComponentMeta<typeof Stat>

const Template: ComponentStory<typeof Stat> = args => <Stat {...args} />

export const Source = Template.bind({})

Source.args = {
  name: 'Name',
  value: 'Value',
  label: 'Label'
}
Source.parameters = {
  chromatic: { disable: true }
}

export const Empty = Template.bind({})
Empty.args = {
  name: 'Kills'
}

export const WithValue = Template.bind({})

WithValue.args = {
  ...Empty.args,
  value: 1000
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  ...WithValue.args,
  label: 'Player [CLAN]'
}

const ListTemplate: ComponentStory<typeof StatList> = args => (
  <StatList {...args} />
)

export const List = ListTemplate.bind({})

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

List.args = {
  kicker: 'Top stats',
  stats: values.map(value => ({ ...Empty.args, value }))
}
