import React from 'react'
import { storiesOf } from '@storybook/react'
import ClanTag from './ClanTag'

storiesOf('Components|Clan tag', module)
  .addParameters({ jest: 'ClanTag' })
  .add('Default', () => <ClanTag href="#">AVA</ClanTag>)
