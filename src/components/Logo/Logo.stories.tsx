import React from 'react'
import { Logo, LogoIcon, LogoLockup } from '@components/Logo'

export default {
  title: 'Components/Logo',
  component: Logo
}

const Template = args => <Logo {...args} />

export const source = Template.bind({})

source.parameters = {
  chromatic: { disable: true }
}

export const icon: React.FC = () => <LogoIcon />

export const lockup: React.FC = () => <LogoLockup />

export const complete = Template.bind({})
