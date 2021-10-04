import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import urlJoin from 'url-join'
import { List, SmartLink } from '@newhighsco/chipset'
import PageContainer, { PageContainerProps } from '@components/PageContainer'
import Lockup from '@components/Lockup'

const url = process.env.NEXT_PUBLIC_SITE_URL

const ClanListingPage: React.FC<PageContainerProps> = ({ meta }) => {
  return (
    <PageContainer meta={meta}>
      <Lockup kicker="Clan" heading="leaderboard" align="center" primary />
      <List>
        <li>
          <Link href="/clans/123" passHref>
            <SmartLink>Cached clan</SmartLink>
          </Link>
        </li>
        <li>
          <Link href="/clans/1486166" passHref>
            <SmartLink>Un-cached clan</SmartLink>
          </Link>
        </li>
      </List>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        canonical: urlJoin(url, '/clans/'),
        title: 'Clan leaderboard',
        description:
          'All clans battling their way to the top of the Destiny 2 clan leaderboard'
      }
    }
  }
}

export default ClanListingPage
