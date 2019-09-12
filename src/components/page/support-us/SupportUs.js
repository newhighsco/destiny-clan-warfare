import React from 'react'
import PageContainer from '../../page-container/PageContainer'
import Card from '../../card/Card'
import { Lockup } from '../../lockup/Lockup'
import { Grid, GridItem } from '../../grid/Grid'
import { Button } from '../../button/Button'
import Prose from '../../prose/Prose'
import Avatar from '../../avatar/Avatar'
import PatreonSvg from '../../../images/icons/patreon.svg'
import PayPalSvg from '../../../images/icons/paypal.svg'

const constants = require('../../../utils/constants')
const meta = {
  title: 'Support us',
  description: `Support the development of ${
    constants.meta.name
  } by becoming a patron or making a donation`
}

function SupportUs() {
  return (
    <PageContainer meta={meta}>
      <Lockup primary center element="h1" kicker="Support us" />
      <Grid flex stacked>
        <GridItem sizes={['tablet-landscape-one-half']}>
          <Card center>
            <Avatar cutout>
              <PatreonSvg />
            </Avatar>
            <Lockup
              center
              element="h2"
              heading="Become a Patron"
              headingAttributes={{ href: constants.social.patreon }}
            />
            <Prose>
              <h3>Stand out from the crowd -</h3>
              <p>
                Join our Insider Programme and gain exclusive previews to new
                features before anyone else and an exclusive badge of honour
                everywhere your name appears on the site.
              </p>
            </Prose>
            <Button href={constants.social.patreon} target="_blank">
              Visit Patreon
            </Button>
          </Card>
        </GridItem>
        <GridItem sizes={['tablet-landscape-one-half']}>
          <Card center>
            <Avatar cutout>
              <PayPalSvg />
            </Avatar>
            <Lockup
              center
              element="h2"
              heading="Make a donation"
              headingAttributes={{ href: constants.social.paypal }}
            />
            <Prose>
              <h3>
                Help us in creating the ultimate website for clan battles &amp;
                competition in Destiny 2 -
              </h3>
              <p>
                100% of your donation will go towards supporting the hosting
                infrastructure and continued development of the site.
              </p>
            </Prose>
            <Button href={constants.social.paypal} target="_blank">
              Visit PayPal
            </Button>
          </Card>
        </GridItem>
      </Grid>
    </PageContainer>
  )
}

export default SupportUs
