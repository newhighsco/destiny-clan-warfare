import React from 'react'
import HoldingPage from '../components/HoldingPage/HoldingPage'
import Helmet from 'react-helmet'
import Logo from '../components/Logo/Logo'
import PatreonSvg from '../images/patreon.svg'
import DiscordSvg from '../images/discord.svg'
import AvalancheUkSvg from '../images/avalanche-uk.svg'

const IndexPage = () => (
  <HoldingPage>
    <Helmet
      meta={[
        { name: 'robots', content: 'noindex,nofollow' }
      ]}
    />
    <div className="content-center content-gutter">
      <Logo medium />
      <div className="panel">
        <h2 className="panel__title text-center">Thanks! We'll be in touch as soon as we're ready to launch.</h2>
      </div>
      <div className="content-center content-center--narrow">
        <div className="grid">
          <div className="grid__item tablet-one-half">
            <a className="panel text-center" href="https://www.patreon.com/destinyclanwarfare" target="_blank" rel="noopener">
              <h2 className="panel__title">Become a Patron and gain exclusive access to the beta</h2>
              <PatreonSvg className="panel__icon" />
            </a>
          </div>
          <div className="grid__item tablet-one-half">
            <a className="panel text-center" href="http://discord.destinyclanwarfare.com" target="_blank" rel="noopener">
              <h2 className="panel__title">Join our Discord server to stay up-to-date with developments</h2>
              <DiscordSvg className="panel__icon" />
            </a>
          </div>
        </div>
        <div className="credit">
          <a className="credit__link" href="https://avaclanche.uk" target="_blank" rel="noopener">
            <AvalancheUkSvg className="credit__logo" />
            <div className="credit__details">
              <small>Proudly brought to you by</small>
              <br />
              <small>the Guardians at Avalanche UK</small>
            </div>
          </a>
        </div>
      </div>
    </div>
  </HoldingPage>
)

export default IndexPage
