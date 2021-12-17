import React from 'react'
import Avatar from '@components/Avatar'

import { ReactComponent as UserSvg } from '../../images/icons/user.svg'

export default {
  title: 'Components/Avatar',
  component: Avatar
}

const Template = args => <Avatar {...args} />

export const source = Template.bind({})

source.args = {
  src: 'https://example.com/image.jpg'
}
source.parameters = {
  chromatic: { disable: true }
}

export const Empty = Template.bind({})

export const Member = Template.bind({})

Member.args = {
  src: 'https://www.bungie.net/img/profile/avatars/cc13.jpg'
}

export const Clan = Template.bind({})

Clan.args = {
  id: '1486166',
  fill: '#5be7de',
  background: {
    fill: '#5be7de',
    src: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_53468fe0799b424f995509d03be6bfa8.png'
  },
  foreground: {
    fill: '#f0f0f0',
    src: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_c0ecd484a44c9aa934f9fb67e1ac1108.png'
  }
}

export const Custom = Template.bind({})

Custom.args = {
  children: <UserSvg />
}
