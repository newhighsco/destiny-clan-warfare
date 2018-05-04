import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Link } from 'react-static'
import { LogoLockup } from '../logo/Logo'
import Icon from '../icon/Icon'
import DiscordSvg from '../../images/discord.svg'
import PatreonSvg from '../../images/patreon.svg'
import PayPalSvg from '../../images/paypal.svg'
import TwitterSvg from '../../images/twitter.svg'
import styles from './Header.styl'

const constants = require('../../utils/constants')
const baseClassName = 'header'

const Header = class extends PureComponent {
  render () {
    const links = [
      { href: constants.social.twitter, text: 'Follow us on Twitter', icon: TwitterSvg },
      { href: constants.social.discord, text: 'Join our Discord server', icon: DiscordSvg },
      { href: constants.social.patreon, text: 'Become a Patron via Patreon', icon: PatreonSvg },
      { href: constants.social.paypal, text: 'Make a donation via PayPal', icon: PayPalSvg }
    ]

    return (
      <header className={styles[baseClassName]} role="banner">
        <div className={classNames(styles[`${baseClassName}__container`], 'content-center content-gutter')}>
          <div className="grid">
            <div className="grid__item one-half">
              <Link className={styles[`${baseClassName}__logo-link`]} to="/">
                <LogoLockup size="small" className={styles[`${baseClassName}__logo-lockup`]} />
              </Link>
            </div>
            { links.length &&
              <div className="grid__item one-half">
                <ul className={classNames('list--inline', styles[`${baseClassName}__list`])}>
                  {links.map((link, i) => {
                    return (
                      <li key={i} className={styles[`${baseClassName}__item`]}>
                        <a className={styles[`${baseClassName}__link`]} href={link.href} title={link.text} target="_blank" rel="noopener noreferrer">
                          <Icon className={styles[`${baseClassName}__icon`]} a11yText={link.text}>
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
}

export default Header
