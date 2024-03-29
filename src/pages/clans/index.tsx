import { List, Prose, SmartLink } from '@newhighsco/chipset'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import React from 'react'

import Lockup from '~components/Lockup'
import PageContainer from '~components/PageContainer'
import { canonicalUrl, clanUrl } from '~helpers/urls'
import { getClans } from '~libs/api'

const ClanListingPage: React.FC = ({
  clans
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const meta = {
    canonical: canonicalUrl(clanUrl()),
    title: 'Clan leaderboard',
    description:
      'All clans battling their way to the top of the Destiny 2 clan leaderboard'
  }

  return (
    <PageContainer meta={meta}>
      <Lockup kicker="Clan" heading="leaderboard" align="center" highlight />
      <Prose>
        <List>
          {clans?.map(({ id, name }) => (
            <li key={id}>
              <Link href={clanUrl(id)} passHref legacyBehavior prefetch={false}>
                <SmartLink>{name}</SmartLink>
              </Link>
            </li>
          ))}
        </List>
      </Prose>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { clans: await getClans(), revalidate: 60 }
  }
}

export default ClanListingPage
