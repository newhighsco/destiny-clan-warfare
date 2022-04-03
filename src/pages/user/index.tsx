import React, { MouseEvent } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { Button, Prose, SmartLink } from '@newhighsco/chipset'
import { Session } from '@helpers/auth'
import { canonicalUrl, clanUrl, signInUrl, signOutUrl } from '@helpers/urls'
import PageContainer, { LoadingPageContainer } from '@components/PageContainer'

const UserPage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) return <LoadingPageContainer />

  if (!session) {
    void router.push(signInUrl)
    return null
  }

  const { user } = session as Session

  return (
    <PageContainer meta={meta}>
      <Prose>
        <ul>
          {user?.clans?.map(({ groupId, membershipId, name }) => (
            <React.Fragment key={groupId}>
              <li>
                <Link href={clanUrl(groupId)} passHref>
                  <SmartLink>{name}</SmartLink>
                </Link>
              </li>
              <li>
                <Link href={clanUrl(groupId, membershipId)} passHref>
                  <SmartLink>{user.name}</SmartLink>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </Prose>
      <Button.Group>
        <Link href={signOutUrl} passHref>
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        title: 'User profile',
        description: 'TODO: Add meta description',
        noindex: true,
        nofollow: true
      }
    }
  }
}

export default UserPage
