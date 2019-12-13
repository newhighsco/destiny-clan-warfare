import React from 'react'
import PageContainer from '../../page-container/PageContainer'
import Card from '../../card/Card'
import { Lockup } from '../../lockup/Lockup'
import Prose from '../../prose/Prose'
import SmartLink from '../../smart-link/SmartLink'

const constants = require('../../../utils/constants')
const meta = {
  title: 'Farewell',
  description: `Thank you all for supporting ${constants.meta.name}`,
  robots: 'noindex,nofollow'
}

function Farewell() {
  return (
    <PageContainer meta={meta}>
      <Card>
        <Lockup center primary kicker="Thank you" heading="Farewell" />
        <Prose>
          <p>
            After over a <strong>hundred</strong> events,{' '}
            <strong>21,803,457</strong> tracked games from{' '}
            <strong>thousands</strong> of clans, and lots of lessons learned,
            we've decided to hold our{' '}
            <SmartLink href="/events/130/">
              final {constants.meta.name} event
            </SmartLink>
            .
          </p>
          <p>
            It wasn't an easy decision, but a number of factors meant this was
            the only real option.
          </p>
          <p>
            We've tried our best to grow our little pocket of the Destiny 2
            community. At times it's been tough, and whilst we now have almost
            three thousand clans taking part in our events, the average
            percentage of clan members taking part has never reached the levels
            we hoped it would.
          </p>
          <p>
            On top of that the increasing infrastructure costs of supporting
            such a fast-paced platform has meant that we regularly exceed your
            generous contributions via Patreon and PayPal each month, leaving us
            out of pocket.
          </p>
          <p>
            To anyone that became a Patron, sponsored an event, created a
            modifier, gave us a little something to buy a beer, helped promote
            us in any way, or simply participated in an event; We will always be
            thankful from the bottom of our hearts.
          </p>
          <p>
            We still have plans to work together on other projects under our{' '}
            <SmartLink href="https://newhighsco.re" target="_blank">
              New High Score
            </SmartLink>{' '}
            brand, but for now, this is the end of {constants.meta.name}.
          </p>
          <p>
            <strong>
              See you on the battlefield Guardians -{' '}
              <SmartLink href="https://twitter.com/benedfit" target="_blank">
                Ben
              </SmartLink>{' '}
              and{' '}
              <SmartLink href="https://twitter.com/mattybeard" target="_blank">
                Matt
              </SmartLink>
            </strong>
          </p>
        </Prose>
      </Card>
    </PageContainer>
  )
}

export default Farewell
