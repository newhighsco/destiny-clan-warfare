import React from 'react'
import Link from 'gatsby-link'
import { LogoIcon } from '../logo/Logo'
import Credit from '../credit/Credit'

import './Footer.styl'

const urlBuilder = require('../../utils/url-builder')

const Footer = () => {
  const date = new Date()

  return (
    <footer className="footer" role="contentinfo">
      <LogoIcon size="small" className="footer__logo" />
      <div className="content-center content-gutter">
        <div className="grid grid--reverse grid--middled">
          <div className="grid__item tablet-one-half">
            <ul className="list--inline footer__list">
              <li className="footer__item">
                <Link className="footer__link" to={urlBuilder.currentEventRootUrl}>Current</Link>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="https://status.destinyclanwarfare.com" target="_blank" rel="noopener noreferrer">Status</a>
              </li>
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
