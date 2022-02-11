import React from 'react'
import classNames from 'classnames'
import Lockup, { LockupSize } from '@components/Lockup'
import { ReactComponent as LogoSvg } from './logo.svg'

import styles from './Logo.module.scss'

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
    size={LockupSize[size]}
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
