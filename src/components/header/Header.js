import React from 'react'
import Link from 'gatsby-link'
import { LogoLockup } from '../logo/Logo'
import Icon from '../icon/Icon'
import TwitterSvg from '../../images/twitter.svg'
import DiscordSvg from '../../images/discord.svg'
import PatreonSvg from '../../images/patreon.svg'

const Header = () => (
  <header className="header" role="banner">
    <div className="header__container content-center content-gutter">
      <div className="grid">
        <div className="grid__item one-half">
          <Link className="header__logo-link" to="/">
            <LogoLockup size="small" className="header__logo-lockup" />
          </Link>
        </div>
        <div className="grid__item one-half">
          <ul className="header__list list--inline">
            <li className="header__item">
              <a className="header__link" href="https://twitter.com/destinyclanwar" target="_blank" rel="noopener">
                <Icon className="header__icon" a11yText="Follow us on Twitter">
                  <TwitterSvg />
                </Icon>
              </a>
            </li>
            <li className="header__item">
              <a className="header__link" href="http://discord.destinyclanwarfare.com" target="_blank" rel="noopener">
                <Icon className="header__icon" a11yText="Join our Discord server">
                  <DiscordSvg />
                </Icon>
              </a>
            </li>
            <li className="header__item">
              <a className="header__link" href="https://www.patreon.com/destinyclanwarfare" target="_blank" rel="noopener">
                <Icon className="header__icon" a11yText="Become a Patron">
                  <PatreonSvg />
                </Icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
)

export default Header
