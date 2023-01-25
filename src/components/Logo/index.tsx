import classNames from 'classnames'
import React from 'react'

import Lockup, { LockupSize } from '~components/Lockup'

import styles from './Logo.module.scss'
import { ReactComponent as LogoSvg } from './logo.svg'

export enum LogoSize {
  Small = LockupSize.Small,
  Medium = LockupSize.Medium
}

interface LogoProps {
  size?: LogoSize
  className?: string
}

const LogoIcon: React.FC<LogoProps> = ({ size, className }) => (
  <LogoSvg
    className={classNames(styles.icon, size && styles[size], className)}
  />
)

const LogoLockup: React.FC<LogoProps> = ({ size, className }) => (
  <Lockup
    as="span"
    kicker="Destiny"
    heading="Clan Warfare"
    kickerAttributes={{ className: styles.kicker }}
    size={LockupSize[LogoSize[size]]}
    className={classNames(styles.lockup, className)}
  />
)

const Logo: React.FC<LogoProps> = ({ size, className }) => (
  <h1 className={classNames(styles.root, className)}>
    <LogoIcon size={size} />
    <LogoLockup size={size} />
  </h1>
)

export { Logo, LogoIcon, LogoLockup }
