import { Button, Prose, SmartLink } from '@newhighsco/chipset'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import React, { type MouseEvent } from 'react'

import PageContainer, { LoadingPageContainer } from '~components/PageContainer'
import { canonicalUrl, clanUrl, signInUrl, signOutUrl } from '~helpers/urls'

const UserPage: React.FC = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) return <LoadingPageContainer />

  if (!session) {
    void router.push(signInUrl)
    return null
  }

  const meta = {
    title: 'User profile',
    description: 'TODO: Add meta description',
    noindex: true,
    nofollow: true
  }
  const { user } = session

  return (
    <PageContainer meta={meta}>
      <Prose>
        <ul>
          {user?.clans?.map(({ groupId, membershipId, name }) => (
            <React.Fragment key={groupId}>
              <li>
                <Link
                  href={clanUrl(groupId)}
                  passHref
                  legacyBehavior
                  prefetch={false}
                >
                  <SmartLink>{name}</SmartLink>
                </Link>
              </li>
              <li>
                <Link
                  href={clanUrl(groupId, membershipId)}
                  passHref
                  legacyBehavior
                  prefetch={false}
                >
                  <SmartLink>{user.name}</SmartLink>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </Prose>
      <Button.Group>
        <Link href={signOutUrl} passHref legacyBehavior prefetch={false}>
          <Button
            onClick={async (e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              await signOut({ callbackUrl: canonicalUrl() })
            }}
          >
            Sign out
          </Button>
        </Link>
      </Button.Group>
    </PageContainer>
  )
}

export default UserPage
