import React from 'react'
import Link from 'gatsby-link'
import { LogoIcon } from '../logo/Logo'
import Credit from '../credit/Credit'

import './Footer.styl'

const urlBuilder = require('../../utils/url-builder')

const Footer = () => {
  const date = new Date()
  const links = [
    { href: urlBuilder.currentEventRootUrl, text: 'Current' },
    { href: '/faqs', text: 'FAQs' }
  ]

  return (
    <footer className="footer" role="contentinfo">
      <LogoIcon size="small" className="footer__logo" />
      <div className="content-center content-gutter">
        <div className="grid grid--reverse grid--middled">
          <div className="grid__item tablet-one-half">
            <ul className="list--inline footer__list">
              {links.map((link, i) => {
                return (
                  <li key={i} className="footer__item">
                    <Link className="footer__link" to={link.href}>{link.text}</Link>
                  </li>
                )
              })}
              <li className="footer__item">
                <span className="footer__link">&copy;{date.getFullYear()}</span>
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

export default Footer
