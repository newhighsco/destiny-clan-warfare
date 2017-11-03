import React from 'react'
import HoldingPage from '../components/HoldingPage/HoldingPage'
import Logo from '../components/Logo/Logo'
import PatreonSvg from '../images/patreon.svg'
import DiscordSvg from '../images/discord.svg'
import AvalancheUkSvg from '../images/avalanche-uk.svg'

const IndexPage = () => (
  <HoldingPage>
    <div className="content-center content-gutter">
      <Logo medium />
      <form className="panel" name="pre-launch" action="thanks" data-netlify="true" method="post">
        <h2 className="panel__title text-center">Sign up to be notified when we launch</h2>
        <div className="content-center content-center--narrow">
          <div className="field" id="field--email">
            <div className="field__question">
              <label htmlFor="control--email">Email</label>
            </div>
            <div className="field__answer">
              <input type="email" className="control control--text" name="email" id="control--email" />
            </div>
          </div>
          <div className="field" id="field--twitter">
            <div className="field__question">
              <label htmlFor="control--twitter">Twitter</label>
            </div>
            <div className="field__answer">
              <input type="text" className="control control--text" name="twitter" id="control--twitter" />
            </div>
          </div>
          <div className="text-center">
            <button className="button" type="submit">Submit</button>
          </div>
        </div>
      </form>
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
