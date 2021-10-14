import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from 'next-auth'
import { signIn } from 'next-auth/client'
import {
  Button,
  ContentContainer,
  Grid,
  HeaderContainer,
  SmartLink
} from '@newhighsco/chipset'
import Avatar, { AvatarSize } from '@components/Avatar'
import { LogoLockup, LogoSize } from '@components/Logo'
import { userUrl } from '@helpers/urls'
import backgroundImage from '@images/header.jpg'

import styles from './Header.module.scss'
interface HeaderProps {
  size?: string
  user?: User
}

const Header: React.FC<HeaderProps> = ({ size, user }) => {
  return (
    <HeaderContainer theme={{ content: styles.root }}>
      <Image
        src={backgroundImage}
        alt=""
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        objectPosition="50% 0"
        className={styles.background}
      />
      <ContentContainer gutter size={size} theme={{ content: styles.content }}>
        <Grid flex valign="middle">
          <Grid.Item className={styles.logo}>
            <Link href="/" passHref>
              <SmartLink className={styles.logoLink}>
                <LogoLockup size={LogoSize.Small} />
              </SmartLink>
            </Link>
          </Grid.Item>
          <Grid.Item className={styles.navigation}>
            <Link href={userUrl()} passHref>
              {user ? (
                <SmartLink>
                  <Avatar src={user.image} size={AvatarSize.Small} />
                </SmartLink>
              ) : (
                <Button
                  onClick={e => {
                    e.preventDefault()
                    signIn('bungie')
                  }}
                >
                  Sign in
                </Button>
              )}
            </Link>
          </Grid.Item>
        </Grid>
      </ContentContainer>
    </HeaderContainer>
  )
}

export default Header
