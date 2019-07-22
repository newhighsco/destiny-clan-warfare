import React, { PureComponent } from 'react'
import Card from '../card/Card'
import Avatar from '../avatar/Avatar'
import { Lockup } from '../lockup/Lockup'
import { ModifierList } from '../modifier/Modifier'
import Prose from '../prose/Prose'
import { Tag } from '../tag/Tag'
import PatreonSvg from '../../images/icons/patreon.svg'

const Sponsorship = class extends PureComponent {
  render() {
    return (
      <Card center>
        <Avatar cutout>
          <PatreonSvg />
        </Avatar>
        <Lockup
          center
          heading="Command the Warfare"
          headingAttributes={{
            href:
              'https://www.patreon.com/join/destinyclanwarfare/checkout?rid=2409387'
          }}
        />
        <Prose>
          <h3>Take command of the theatre of operations -</h3>
          <p>
            Create your own event, pick all the modifiers, create your own event
            modifier, and wear the exclusive{' '}
            <Tag element="span" name="Insider" size="large" /> badge of honour
            everywhere your name appears on the site.
          </p>
        </Prose>
        <ModifierList modifiers={[{ name: 'Modifier TBC' }]} />
      </Card>
    )
  }
}

export default Sponsorship
