import React, { PureComponent } from 'react'
import Card from '../card/Card'
import { Lockup } from '../lockup/Lockup'
import { ModifierList } from '../modifier/Modifier'
import Prose from '../prose/Prose'
import { Tag } from '../tag/Tag'
import { Button } from '../button/Button'

const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const patreonTier = constants.patreon.eventCreator
const linkAttributes = {
  href: urlBuilder.patreonUrl(patreonTier),
  target: '_blank'
}
const unknownModifier = {
  name: constants.modifiers.tbc[0],
  ...linkAttributes
}

const Sponsorship = class extends PureComponent {
  render() {
    return (
      <Card center promoted>
        <Lockup
          center
          heading={patreonTier.name}
          headingAttributes={linkAttributes}
        />
        <Prose contained>
          <h3>Take command of the theatre of operations -</h3>
          <p>
            Create your own event; pick all the modifiers, create your own
            modifier, and wear the exclusive{' '}
            <Tag element="span" name="Insider" size="large" /> badge of honour
            everywhere your name appears on the site.
          </p>
        </Prose>
        <ModifierList
          modifiers={[unknownModifier, unknownModifier, unknownModifier]}
          enableHover={false}
        />
        <Button {...linkAttributes}>Create your own event</Button>
      </Card>
    )
  }
}

export default Sponsorship
