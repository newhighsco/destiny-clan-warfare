import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { List, Prose, SmartLink } from '@newhighsco/chipset'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import { canonicalUrl, clanUrl } from '@helpers/urls'

const ClanListingPage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageContainer meta={meta}>
      <Lockup kicker="Clan" heading="leaderboard" align="center" highlight />
      <Prose>
        <List>
          <li>
            <Link href={clanUrl('123')} passHref prefetch={false}>
              <SmartLink>Cached clan</SmartLink>
            </Link>
          </li>
          <li>
            <Link href={clanUrl('1486166')} passHref prefetch={false}>
              <SmartLink>Un-cached clan</SmartLink>
            </Link>
          </li>
        </List>
      </Prose>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        canonical: canonicalUrl(clanUrl()),
        title: 'Clan leaderboard',
        description:
          'All clans battling their way to the top of the Destiny 2 clan leaderboard'
      }
    }
  }
}

export default ClanListingPage
