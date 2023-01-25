import { company } from '~fixtures/clans'

import Lockup from '.'

export default { component: Lockup }

export const Source = {
  args: { heading: 'Heading', kicker: 'Kicker', children: 'Content' },
  parameters: { chromatic: { disable: true } }
}

export const WithHeading = {
  args: { heading: company.name, headingAttributes: { href: '#' } }
}

export const WithKicker = {
  args: { kicker: company.motto, kickerAttributes: { href: '#' } }
}

export const WithBoth = { args: { ...WithHeading.args, ...WithKicker.args } }

export const Highlighted = { args: { ...WithBoth.args, highlight: true } }

export const Reversed = { args: { ...WithBoth.args, reverse: true } }

export const CenterAligned = { args: { ...WithBoth.args, align: 'center' } }

export const RightAligned = { args: { ...WithBoth.args, align: 'right' } }

export const WithoutBorders = { args: { ...WithBoth.args, border: false } }
