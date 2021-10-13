import React, { useEffect, useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'
import { Button, Prose, SmartLink } from '@newhighsco/chipset'
import { getMember, getMemberClans } from '@libs/bungie'
import PageContainer from '@components/PageContainer'
import { clanUrl } from '@helpers/urls'

const HomePage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [session] = useSession()
  const [loading, setLoading] = useState(true)
  const [member, setMember] = useState(null)
  const [clans, setClans] = useState(null)

  useEffect(() => {
    if (session) {
      const { membershipId } = session

      const fetchData = async () => {
        setMember(await getMember(membershipId as string))
        setClans(await getMemberClans(membershipId as string))
        setLoading(false)
      }

      fetchData()
    }
  }, [session])

  return (
    <PageContainer meta={meta}>
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
                        member.bungieNetUser.membershipId
                      )}
                      passHref
                    >
                      <SmartLink>{member.bungieNetUser.displayName}</SmartLink>
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
          <br />
          <Button
            href="/api/auth/signout"
            onClick={e => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </Button>
        </>
      )}
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        noindex: true,
        nofollow: true
      }
    }
  }
}

export default HomePage
