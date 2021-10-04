import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  Grid,
  HeaderContainer,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup, LogoSize } from '@components/Logo'

import styles from './Header.module.scss'

interface HeaderProps {
  size?: string
}

const Header: React.FC<HeaderProps> = ({ size }) => (
  <HeaderContainer theme={{ root: styles.root, content: styles.content }}>
    <ContentContainer gutter size={size}>
      <Grid>
        <Grid.Item sizes={['one-half']}>
          <Link href="/" passHref>
            <SmartLink className={styles.logo}>
              <LogoLockup size={LogoSize.Small} className={styles.logoLockup} />
            </SmartLink>
          </Link>
        </Grid.Item>
      </Grid>
    </ContentContainer>
  </HeaderContainer>
)

export default Header
