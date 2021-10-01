import React from 'react'
import classNames from 'classnames'
import Lockup, { LockupProps } from '@components/Lockup'
import { ReactComponent as LogoSvg } from './logo.svg'

import styles from './Logo.module.scss'

export enum LogoSize {
  Small = 'small',
  Medium = 'medium'
}

interface LogoIconProps {
  size?: LogoSize
  className?: string
}

const LogoIcon: React.FC<LogoIconProps> = ({ size, className }) => (
  <LogoSvg
    className={classNames(styles.icon, size && styles[size], className)}
  />
)

interface LogoLockupProps extends LogoIconProps {
  kicker?: LockupProps['kicker']
  heading?: LockupProps['heading']
}

const LogoLockup: React.FC<LogoLockupProps> = ({
  kicker = 'Destiny',
  heading = 'Clan Warfare',
  size,
  className
}) => (
  <Lockup
    as="span"
    heading={heading}
    kicker={kicker}
    kickerAttributes={{ className: styles.kicker }}
    className={classNames(styles.lockup, size && styles[size], className)}
  />
)

const Logo: React.FC<LogoLockupProps> = ({
  kicker,
  heading,
  size,
  className
}) => (
  <h1 className={classNames(styles.root, className)}>
    <LogoIcon size={size} />
    <LogoLockup kicker={kicker} heading={heading} size={size} />
  </h1>
)

export { Logo, LogoIcon, LogoLockup }
