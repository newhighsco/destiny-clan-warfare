import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { List, Prose, SmartLink } from '@newhighsco/chipset'
import PageContainer from '@components/PageContainer'
import Lockup from '@components/Lockup'
import { canonicalUrl, clanUrl } from '@helpers/urls'

const ClanListingPage: React.FC = ({
  leaderboard,
  members,
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageContainer meta={meta}>
      <Lockup kicker="Clan" heading="leaderboard" align="center" highlight />
      <Prose>
        <List>
          <li>
            <Link href={clanUrl('123')} passHref>
              <SmartLink>Cached clan</SmartLink>
            </Link>
          </li>
          <li>
            <Link href={clanUrl('1486166')} passHref>
              <SmartLink>Un-cached clan</SmartLink>
            </Link>
          </li>
        </List>
        <p>
          ClanLeaderboard.json:
        </p>
        <pre>{JSON.stringify(leaderboard, null, 2)}</pre>
        <p>
          ClanMembersLeaderboard.json:
        </p>
        <pre>{JSON.stringify(members, null, 2)}</pre>
      </Prose>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const leaderboard = await fetch(
    'https://newhighscoredcw.blob.core.windows.net/dcw/CurrentEvent/ClanLeaderboard.json'
  ).then(async res => await res.json())

  const members = await fetch(
    'https://newhighscoredcw.blob.core.windows.net/dcw/CurrentEvent/ClanMembersLeaderboard.json'
  ).then(async res => await res.json())

  return {
    props: {
      leaderboard,
      members,
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
