import React from 'react'
import { storiesOf } from '@storybook/react'
import { Lockup } from './Lockup'

const heading = 'Avalanche Uk'
const kicker = 'Hardcore Casuals / Laidback Diehards'

storiesOf('Lockup', module)
  .add('Heading', () => <Lockup heading={heading} />)
  .add('Kicker', () => <Lockup kicker={kicker} />)
  .add('Both', () => <Lockup heading={heading} kicker={kicker} />)
  .add('Reversed', () => <Lockup reverse heading={heading} kicker={kicker} />)
  .add('Centered', () => <Lockup center heading={heading} kicker={kicker} />)
  .add('Borderless', () => (
    <Lockup borderless heading={heading} kicker={kicker} />
  ))
  .add('Primary', () => <Lockup primary heading={heading} kicker={kicker} />)
