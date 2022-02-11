import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Logo, LogoIcon, LogoLockup } from '@components/Logo'

export default {
  title: 'Components/Logo',
  component: Logo
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = args => <Logo {...args} />

export const source = Template.bind({})

source.parameters = {
  chromatic: { disable: true }
}

export const icon: React.FC = () => <LogoIcon />

export const lockup: React.FC = () => <LogoLockup />

export const complete = Template.bind({})
