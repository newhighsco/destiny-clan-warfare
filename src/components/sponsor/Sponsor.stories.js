import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Sponsor from './Sponsor'
import Logos from './logos'

const sponsors = [ ...Object.keys(Logos), 'nonexistent' ]

storiesOf('Sponsor', module)
  .add('All', () => (
    <Fragment>
      {sponsors.map(sponsor => (
        <Sponsor name={sponsor} />
      ))}
    </Fragment>
  ))
