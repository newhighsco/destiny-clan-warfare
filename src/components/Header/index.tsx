import React from 'react'
import Image from 'next/image'
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
import backgroundImage from '@images/header.jpg'

import styles from './Header.module.scss'

interface HeaderProps {
  size?: string
}

const Header: React.FC<HeaderProps> = ({ size }) => {
  const [session] = useSession()

  return (
    <HeaderContainer theme={{ root: styles.root }}>
      <Image
        src={backgroundImage}
        alt=""
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        objectPosition="50% 0"
        className={styles.background}
      />
      <ContentContainer gutter size={size} theme={{ root: styles.content }}>
        <Grid valign="middle">
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
