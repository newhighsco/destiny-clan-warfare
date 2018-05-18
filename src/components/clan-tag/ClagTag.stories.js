import React from 'react'
import { storiesOf } from '@storybook/react'
import ClanTag from './ClanTag'

storiesOf('Clan tag', module)
  .add('Default', () => (
    <ClanTag href="#">AVA</ClanTag>
  ))
