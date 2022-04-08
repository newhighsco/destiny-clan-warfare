import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Clan from '@components/Clan'
import { company } from '@fixtures/clans'
import { CURRENT_TENSE } from '@helpers/urls'

export default {
  title: 'Components/Clan',
  component: Clan
} as ComponentMeta<typeof Clan>

const Template: ComponentStory<typeof Clan> = args => <Clan {...args} />

export const Source = Template.bind({})

Source.args = {}
Source.parameters = {
  chromatic: { disable: true }
}

export const Overall = Template.bind({})

Overall.args = {
  ...company,
  medals: [
    { name: 'The best of the best', tier: 3, count: 3 },
    { name: 'First company', tier: 2, count: 4 },
    { name: 'Top 3 company', tier: 1, count: 7 }
  ]
}

export const Current = Template.bind({})

Current.args = {
  ...company,
  tense: CURRENT_TENSE,
  description: null,
  stats: [
    { name: 'Total active', value: 100 },
    { name: 'Total games', value: 1000 },
    { name: 'Bonus 1', value: 1000 },
    { name: 'Bonus 2', value: 1000 }
  ]
}
