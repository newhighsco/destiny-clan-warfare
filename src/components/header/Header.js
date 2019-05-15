import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Link } from '@reach/router'
import { OutboundLink } from 'react-ga-donottrack'
import { LogoLockup } from '../logo/Logo'
import List from '../list/List'
import Icon from '../icon/Icon'
import PatreonSvg from '../../images/icons/patreon.svg'
import PayPalSvg from '../../images/icons/paypal.svg'
import TwitterSvg from '../../images/icons/twitter.svg'
import styles from './Header.styl'

const constants = require('../../utils/constants')

const baseClassName = 'header'
const links = [
  {
    href: constants.social.twitter,
    text: 'Follow us on Twitter',
    icon: TwitterSvg
  },
  {
    href: constants.social.patreon,
    text: 'Become a Patron via Patreon',
    icon: PatreonSvg
  },
  {
    href: constants.social.paypal,
    text: 'Make a donation via PayPal',
    icon: PayPalSvg
  }
]

const Header = class extends PureComponent {
  render() {
    return (
      <header className={styles[baseClassName]} role="banner">
        <div
          className={classNames(
            styles[`${baseClassName}__container`],
            'content-center content-gutter'
          )}
        >
          <div className="grid">
            <div className="grid__item one-half">
              <Link className={styles[`${baseClassName}__logo-link`]} to="/">
                <LogoLockup
                  size="small"
                  className={styles[`${baseClassName}__logo-lockup`]}
                />
              </Link>
            </div>
            {links.length && (
              <div className="grid__item one-half">
                <List inline className={styles[`${baseClassName}__list`]}>
                  {links.map((link, i) => {
                    return (
                      <li key={i} className={styles[`${baseClassName}__item`]}>
                        <OutboundLink
                          className={styles[`${baseClassName}__link`]}
                          to={link.href}
                          eventLabel={link.href}
                          title={link.text}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon
                            className={styles[`${baseClassName}__icon`]}
                            a11yText={link.text}
                          >
                            <link.icon />
                          </Icon>
                        </OutboundLink>
                      </li>
                    )
                  })}
                </List>
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }
}

export default Header
