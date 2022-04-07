import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Avatar from '@components/Avatar'

import { ReactComponent as UserSvg } from '../../images/icons/user.svg'
import { company } from '@fixtures/clans'

export default {
  title: 'Components/Avatar',
  component: Avatar
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />

export const Source = Template.bind({})

Source.args = {
  src: 'https://example.com/image.jpg'
}
Source.parameters = {
  chromatic: { disable: true }
}

export const Empty = Template.bind({})

export const Member = Template.bind({})

Member.args = {
  src: 'https://www.bungie.net/img/profile/avatars/cc13.jpg'
}

export const Clan = Template.bind({})

Clan.args = {
  id: company.id,
  ...company.avatar
}

export const Custom = Template.bind({})

Custom.args = {
  children: <UserSvg />
}
