import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Lockup } from '../lockup/Lockup'
import LogoSvg from './logo.svg'
import styles from './Logo.styl'

const sizes = [ 'small', 'medium' ]
const baseClassName = 'logo'

const Logo = ({ size, className }) => {
  return (
    <h1 className={classNames(styles[baseClassName], className)}>
      <LogoIcon size={size} />
      <LogoLockup size={size} />
    </h1>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(sizes)
}

const LogoIcon = ({ size, className }) => {
  const iconClassName = `${baseClassName}-icon`

  return (
    <LogoSvg className={classNames(styles[iconClassName], size && styles[`${iconClassName}--${size}`], className)} />
  )
}

LogoIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(sizes)
}

const LogoLockup = ({ size, className }) => {
  const lockupClassName = `${baseClassName}-lockup`

  return (
    <Lockup className={classNames(styles[lockupClassName], size && styles[`${lockupClassName}--${size}`], className)}
      heading="Clan Warfare"
      kicker="Destiny"
      element="span"
    />
  )
}

LogoLockup.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(sizes)
}

export {
  Logo,
  LogoIcon,
  LogoLockup
}
