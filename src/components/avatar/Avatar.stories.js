import React from 'react'
import { storiesOf } from '@storybook/react'
import Avatar from './Avatar'

storiesOf('Avatar', module)
  .addDecorator(story => (
    <div style={{ width: 96 }}>
      {story()}
    </div>
  ))
  .add('Member', () => (
    <Avatar icon="https://www.bungie.net/img/profile/avatars/cc18.jpg" />
  ))
  .add('Clan', () => (
    <Avatar
      color="#5be7de"
      foreground={{ color: '#f0f0f0', icon: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_c0ecd484a44c9aa934f9fb67e1ac1108.png' }}
      background={{ color: '#5be7de', icon: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_53468fe0799b424f995509d03be6bfa8.png' }}
    />
  ))
