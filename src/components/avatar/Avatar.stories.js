import React from 'react'
import { storiesOf } from '@storybook/react'
import Avatar from './Avatar'
import PatreonSvg from '../../images/icons/patreon.svg'

storiesOf('Components|Avatar', module)
  .addParameters({ jest: 'Avatar' })
  .add('Default', () => <Avatar />)
  .add('Member', () => <Avatar icon="cc18.jpg" />)
  .add('Clan', () => (
    <Avatar
      color="#5be7de"
      foreground={{
        color: '#f0f0f0',
        icon: 'c0ecd484a44c9aa934f9fb67e1ac1108'
      }}
      background={{
        color: '#5be7de',
        icon: '53468fe0799b424f995509d03be6bfa8'
      }}
    />
  ))
  .add('Custom', () => (
    <Avatar>
      <PatreonSvg />
    </Avatar>
  ))
