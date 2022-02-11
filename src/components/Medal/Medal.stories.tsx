import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Medal, MedalList } from '@components/Medal'

export default {
  title: 'Components/Medal',
  component: Medal
} as ComponentMeta<typeof Medal>

const Template: ComponentStory<typeof Medal> = args => <Medal {...args} />

export const source = Template.bind({})

const List: ComponentStory<typeof MedalList> = args => <MedalList {...args} />

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
