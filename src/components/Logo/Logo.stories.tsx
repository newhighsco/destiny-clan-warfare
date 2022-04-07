import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Logo, LogoIcon, LogoLockup } from '@components/Logo'

export default {
  title: 'Components/Logo',
  component: Logo
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = args => <Logo {...args} />

export const Source = Template.bind({})

Source.parameters = {
  chromatic: { disable: true }
}

export const Icon: React.FC = () => <LogoIcon />

export const Lockup: React.FC = () => <LogoLockup />

export const Complete = Template.bind({})
