import React from 'react'
import Link from 'gatsby-link'
import { LogoLockup } from '../logo/Logo'
import Icon from '../icon/Icon'
import DiscordSvg from '../../images/discord.svg'
import PatreonSvg from '../../images/patreon.svg'
import PayPalSvg from '../../images/paypal.svg'
import TwitterSvg from '../../images/twitter.svg'

import './Header.styl'

const constants = require('../../utils/constants')

const Header = () => {
  const links = [
    { href: constants.social.twitter, text: 'Follow us on Twitter', icon: TwitterSvg },
    { href: constants.social.discord, text: 'Join our Discord server', icon: DiscordSvg },
    { href: constants.social.patreon, text: 'Become a Patron via Patreon', icon: PatreonSvg },
    { href: constants.social.paypal, text: 'Make a donation via PayPal', icon: PayPalSvg }
  ]

  return (
    <header className="header" role="banner">
      <div className="header__container content-center content-gutter">
        <div className="grid">
          <div className="grid__item one-half">
            <Link className="header__logo-link" to="/">
              <LogoLockup size="small" className="header__logo-lockup" />
            </Link>
          </div>
          { links.length &&
            <div className="grid__item one-half">
              <ul className="list--inline header__list">
                {links.map((link, i) => {
                  return (
                    <li key={i} className="header__item">
                      <a className="header__link" href={link.href} title={link.text} target="_blank" rel="noopener noreferrer">
                        <Icon className="header__icon" a11yText={link.text}>
                          <link.icon />
                        </Icon>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
