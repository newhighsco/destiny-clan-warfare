import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Sponsor from './Sponsor'

const sponsors = ['Insert Coin', 'nonexistent']

storiesOf('Sponsor', module).add('All', () => (
  <Fragment>
    {sponsors.map((sponsor, index) => (
      <Sponsor key={index} name={sponsor} />
    ))}
  </Fragment>
))
