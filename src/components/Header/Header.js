import React from 'react'
import Link from 'gatsby-link'
import { LogoIcon, LogoLockup } from '../Logo/Logo'

const Header = () => (
  <header className="header" role="banner">
    <div className="header__container content-center content-gutter">
      <LogoIcon size="medium" className="header__logo-icon" />
      <Link className="header__logo" to="/">
        <LogoLockup size="small" className="header__logo-lockup" />
      </Link>
    </div>
  </header>
)

export default Header
