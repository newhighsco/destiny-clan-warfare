import React from 'react'
import { storiesOf } from '@storybook/react'
import { Logo, LogoIcon, LogoLockup } from './Logo'

storiesOf('Logo', module)
  .add('Icon', () => <LogoIcon />)
  .add('Lockup', () => <LogoLockup />)
  .add('Complete', () => <Logo />)
