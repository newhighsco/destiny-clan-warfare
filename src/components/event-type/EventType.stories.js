import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import EventType from './EventType'
import Icons from './icons'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'

storiesOf('Events', module)
  .add('Types', () => (
    <Fragment>
      {Object.keys(Icons).map((key, i) => (
        <div key={i} style={{ display: 'inline-block', padding: '1em' }}>
          <Card center>
            <EventType name={key} />
            <Lockup center heading={key} />
          </Card>
        </div>
      ))}
    </Fragment>
  ))
