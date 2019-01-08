import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Link } from '@reach/router'
import { LogoIcon } from '../logo/Logo'
import Credit from '../credit/Credit'
import styles from './Footer.styl'

const baseClassName = 'footer'
const date = new Date()
const links = [
  { href: '/faqs/', text: 'FAQs' },
  { href: '/support-us/', text: 'Support us' }
]

const Footer = class extends PureComponent {
  render () {
    return (
      <footer className={styles[baseClassName]} role="contentinfo">
        <Link to="#top" title="Back to top">
          <LogoIcon size="small" className={styles[`${baseClassName}__logo`]} />
        </Link>
        <div className="content-center content-gutter">
          <div className="grid grid--reverse grid--middled grid--gutter-quadruple">
            <div className="grid__item tablet-one-half">
              <ul className={classNames('list--inline', `${baseClassName}__list`)}>
                {links.map((link, i) => {
                  return (
                    <li key={i} className={styles[`${baseClassName}__item`]}>
                      <Link className={styles[`${baseClassName}__link`]} to={link.href}>{link.text}</Link>
                    </li>
                  )
                })}
                <li className={styles[`${baseClassName}__item`]}>
                  <span className={styles[`${baseClassName}__link`]}>&copy;{date.getFullYear()}</span>
                </li>
              </ul>
            </div>
            <div className="grid__item tablet-one-half">
              <Credit />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
