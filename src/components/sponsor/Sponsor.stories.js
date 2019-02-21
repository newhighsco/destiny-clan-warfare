import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Sponsor from './Sponsor'

const sponsors = [ 'Insert Coin', 'nonexistent' ]

storiesOf('Sponsor', module)
  .add('All', () => (
    <Fragment>
      {sponsors.map(sponsor => (
        <Sponsor name={sponsor} />
      ))}
    </Fragment>
  ))
