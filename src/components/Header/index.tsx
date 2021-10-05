import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client'
import {
  Button,
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

const Header: React.FC<HeaderProps> = ({ size }) => {
  const [session] = useSession()

  return (
    <HeaderContainer theme={{ root: styles.root, content: styles.content }}>
      <ContentContainer gutter size={size}>
        <Grid>
          <Grid.Item sizes={['one-half']}>
            <Link href="/" passHref>
              <SmartLink className={styles.logo}>
                <LogoLockup
                  size={LogoSize.Small}
                  className={styles.logoLockup}
                />
              </SmartLink>
            </Link>
          </Grid.Item>
          <Grid.Item sizes={['one-half']} align="right">
            <Button
              href={`/api/auth/${session ? 'signout' : 'signin'}`}
              onClick={e => {
                e.preventDefault()

                if (session) {
                  signOut()
                } else {
                  signIn('bungie')
                }
              }}
            >
              Sign {session ? 'out' : 'in'}
            </Button>
          </Grid.Item>
        </Grid>
      </ContentContainer>
    </HeaderContainer>
  )
}

export default Header
