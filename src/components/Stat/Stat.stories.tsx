import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Stat, StatList, StatProps } from '@components/Stat'

export default {
  title: 'Components/Stat',
  component: Stat
}

const Template: Story<StatProps> = args => <Stat {...args} />

export const source = Template.bind({})

export const simple = Template.bind({})

simple.args = {
  label: 'Foo',
  value: 'Bar'
}

export const complex = Template.bind({})

complex.args = {
  label: 'Foo',
  value: {
    label: 'Fizz',
    value: 'Buzz'
  }
}

export const list = () => {
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

  return (
    <StatList
      kicker="Top stats"
      stats={values.map(value => ({ label: 'Kills', value }))}
    />
  )
}
