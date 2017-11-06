import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from './logo.svg'

const Logo = ({ small, medium }) => (
  <Link to="/" className={classNames({ logo: true, 'logo--small': small, 'logo--medium': medium })}>
    <LogoIcon />
    <LogoLockup />
  </Link>
)

Logo.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool
}

const LogoIcon = () => (
  <Icon className="logo-icon" />
)

const LogoLockup = () => (
  <h1 className="logo-lockup">
    <div className="logo-lockup__kicker">Destiny </div>
    <div className="logo-lockup__text">Clan Warfare</div>
  </h1>
)

const components = {
  Logo,
  LogoIcon,
  LogoLockup
}

export default components
