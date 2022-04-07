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
  ...company
}

export const Current = Template.bind({})

Current.args = {
  ...Overall.args,
  tense: CURRENT_TENSE
}
