import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from './logo.svg'

const Logo = ({ small, medium }) => (
  <Link to="/" className={classNames({ logo: true, 'logo--small': small, 'logo--medium': medium })}>
    <Icon className="logo__icon" />
    <h1 className="logo__lockup">
      <div className="logo__kicker">Destiny </div>
      <div className="logo__text">Clan Warfare</div>
    </h1>
  </Link>
)

Logo.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool
}

export default Logo
