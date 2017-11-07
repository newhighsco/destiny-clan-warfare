import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from './logo.svg'

const Logo = ({ size }) => (
  <h1 className={classNames('logo', size && `logo--${size}`)}>
    <LogoIcon />
    <LogoLockup />
  </h1>
)

Logo.propTypes = {
  size: PropTypes.oneOf([ 'small', 'medium' ])
}

const LogoIcon = () => (
  <Icon className="logo-icon" />
)

const LogoLockup = () => (
  <span className="logo-lockup">
    <span className="logo-lockup__kicker">Destiny </span>
    <span className="logo-lockup__text">Clan Warfare</span>
  </span>
)

const components = {
  Logo,
  LogoIcon,
  LogoLockup
}

export default components
