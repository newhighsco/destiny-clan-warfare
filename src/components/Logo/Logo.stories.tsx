import React from 'react'
import { Logo, LogoIcon, LogoLockup } from '.'

export default { component: Logo }

export const Source = { parameters: { chromatic: { disable: true } } }

export const Icon = { render: () => <LogoIcon /> }

export const Lockup = { render: () => <LogoLockup /> }

export const Complete = {}
