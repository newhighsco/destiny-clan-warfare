import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from './logo.svg'

const Logo = ({ small }) => (
  <Link to="/" className={classNames({ logo: true, 'logo--small': small })}>
    <Icon className="logo__icon" />
    <div className="logo__lockup">
      <div className="logo__kicker">Destiny</div>
      <div className="logo__text">Clan Warfare</div>
    </div>
  </Link>
)

Logo.propTypes = {
  small: PropTypes.bool
}

export default Logo
