import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import urlJoin from 'url-join'
import { List, SmartLink } from '@newhighsco/chipset'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import config from '@config'

const { url } = config

const ClanListingPage: React.FC = ({
  leaderboard,
  members,
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <p>
        https://newhighscoredcw.blob.core.windows.net/dcw/1/ClanLeaderboard.json:
      </p>
      <pre>{JSON.stringify(leaderboard, null, 2)}</pre>
      <p>
        https://newhighscoredcw.blob.core.windows.net/dcw/1/ClanMembers.json:
      </p>
      <pre>{JSON.stringify(members, null, 2)}</pre>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const leaderboard = await fetch(
    'https://newhighscoredcw.blob.core.windows.net/dcw/1/ClanLeaderboard.json'
  ).then(res => res.json())

  const members = await fetch(
    'https://newhighscoredcw.blob.core.windows.net/dcw/1/ClanMembers.json'
  ).then(res => res.json())

  return {
    props: {
      leaderboard,
      members,
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
