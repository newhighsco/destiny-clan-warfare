import React from 'react'

import { company } from '~fixtures/clans'
import { member } from '~fixtures/members'
import { ReactComponent as UserSvg } from '~images/icons/user.svg'

import Avatar from '.'

export default { component: Avatar }

export const Source = {
  args: { src: 'https://example.com/image.jpg' },
  parameters: { chromatic: { disable: true } }
}

export const Empty = {}

export const Member = { args: { src: member.image } }

export const Clan = { args: { id: company.id, ...company.avatar } }

export const Custom = { args: { children: <UserSvg /> } }
