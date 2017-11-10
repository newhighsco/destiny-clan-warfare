import React from 'react'
import Link from 'gatsby-link'
import Credit from '../credit/Credit'

const Footer = () => {
  const date = new Date()

  return (
    <footer className="footer" role="contentinfo">
      <div className="content-center content-gutter">
        <div className="grid grid--reverse grid--middled">
          <div className="grid__item tablet-one-half">
            <ul className="footer__list list--inline">
              <li className="footer__item">
                <Link className="footer__link" to="/clans">Clans</Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link" to="/members">Members</Link>
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
