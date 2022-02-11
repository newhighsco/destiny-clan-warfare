import React, { MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/client'
import {
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
import Icon from '@components/Icon'
interface HeaderProps {
  size?: string
}

const Header: React.FC<HeaderProps> = ({ size }) => {
  const [session] = useSession()

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
        priority
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
              <SmartLink
                className={styles.userLink}
                onClick={
                  !session
                    ? async (e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        await signIn('bungie')
                      }
                    : undefined
                }
                title={session ? 'View user profile' : 'Sign in'}
              >
                <Avatar src={session?.user.image} size={AvatarSize.Small}>
                  {!session && <Icon name="user" width="100%" />}
                </Avatar>
              </SmartLink>
            </Link>
          </Grid.Item>
        </Grid>
      </ContentContainer>
    </HeaderContainer>
  )
}

export default Header
