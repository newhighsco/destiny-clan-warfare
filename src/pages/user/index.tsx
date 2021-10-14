import React, { useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { getSession, signOut, useSession } from 'next-auth/client'
import { Button, Prose, SmartLink } from '@newhighsco/chipset'
import { getMemberClans } from '@libs/bungie'
import { canonicalUrl, clanUrl, signInUrl, signOutUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'

const UserPage: React.FC = ({
  meta
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [session] = useSession()
  const [loading, setLoading] = useState(true)
  const [clans, setClans] = useState(null)

  useEffect(() => {
    if (session) {
      const { membershipId } = session

      const fetchData = async () => {
        setClans(await getMemberClans(membershipId as string))
        setLoading(false)
      }

      fetchData()
    }
  }, [session])

  return (
    <PageContainer meta={meta}>
      {/* TODO: Loading state */}
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Prose>
            <ul>
              {clans?.results?.map(({ group }) => (
                <React.Fragment key={group.groupId}>
                  <li>
                    <Link
                      href={clanUrl(
                        group.groupId,
                        session.membershipId as string
                      )}
                      passHref
                    >
                      <SmartLink>{session.user.name}</SmartLink>
                    </Link>
                  </li>
                  <li>
                    <Link href={clanUrl(group.groupId)} passHref>
                      <SmartLink>{group.name}</SmartLink>
                    </Link>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </Prose>
          <Button.Group>
            <Link href={signOutUrl} passHref>
              <Button
                onClick={e => {
                  e.preventDefault()
                  signOut({ callbackUrl: canonicalUrl() })
                }}
              >
                Sign out
              </Button>
            </Link>
          </Button.Group>
        </>
      )}
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: signInUrl,
        permanent: false
      }
    }
  }

  return {
    props: {
      session,
      meta: {
        // TODO: Add title and description
        title: 'User profile',
        noindex: true,
        nofollow: true
      }
    }
  }
}

export default UserPage
