import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Medal, MedalList, MedalListProps, MedalProps } from '@components/Medal'

export default {
  title: 'Components/Medal',
  component: Medal
}

const Template: Story<MedalProps> = args => <Medal {...args} />

export const source = Template.bind({})

const List: Story<MedalListProps> = args => <MedalList {...args} />

export const list = List.bind({})

list.args = {
  medals: [
    { name: 'Top 3 company', tier: 1, count: 1 },
    { name: 'Top 3 company', tier: 1, count: 5 },
    { name: 'First company', tier: 2, count: 1 },
    { name: 'First company', tier: 2, count: 5 },
    { tier: 2, count: 5 },
    { tier: 2, count: 1 },
    { name: 'The best of the best', tier: 3, count: 1 },
    { name: 'The best of the best', tier: 3, count: 5 },
    { tier: 3, count: 5 },
    { tier: 3, count: 1 },
    { name: 'Nonexistent', count: 5 },
    { name: 'Nonexistent', count: 1 }
  ]
}
