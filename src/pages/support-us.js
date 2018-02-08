import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Button } from '../components/button/Button'
import Prose from '../components/prose/Prose'
import Avatar from '../components/avatar/Avatar'
import PatreonSvg from '../images/patreon.svg'
import PayPalSvg from '../images/paypal.svg'

const constants = require('../utils/constants')

class SupportUsPage extends Component {
  render () {
    const { data } = this.props
    const title = 'Support us'
    const description = `Ways to support ${constants.meta.name}`

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
        <Lockup primary center element="h1" kicker="Support us" />
        <div className="grid grid--flex">
          <div className="grid__item tablet-landscape-one-half">
            <Card center>
              <Avatar cutout>
                <PatreonSvg />
              </Avatar>
              <Lockup center element="h2" headingHref={constants.social.patreon} heading="Become a Patron" />
              <Prose>
                <h3>Stand out from the crowd -</h3>
                <p>Join our Insider Programme and gain exclusive previews to new features before anyone else and an exclusive badge of honour everywhere your name appears on the site.</p>
              </Prose>
              <Button href={constants.social.patreon}>Visit Patreon</Button>
            </Card>
          </div>
          <div className="grid__item tablet-landscape-one-half">
            <Card center>
              <Avatar cutout>
                <PayPalSvg />
              </Avatar>
              <Lockup center element="h2" headingHref={constants.social.paypal} heading="Make a donation" />
              <Prose>
                <h3>Help us in creating the ultimate website for clan battles &amp; competition in Destiny 2 -</h3>
                <p>100% of your donation will go towards supporting the hosting infrastructure and continued development of the site.</p>
              </Prose>
              <Button href={constants.social.paypal}>Visit PayPal</Button>
            </Card>
          </div>
        </div>
      </PageContainer>
    )
  }
}

SupportUsPage.propTypes = {
  data: PropTypes.object
}

export default SupportUsPage

export const pageQuery = graphql`
  query SupportUsPageQuery {
    apiStatus {
      bungieCode
    }
  }
`
