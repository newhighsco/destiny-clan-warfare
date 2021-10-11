import React, { useEffect, useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'
import { Button, Prose, SmartLink } from '@newhighsco/chipset'
import { getMember, getMemberClans } from '@libs/bungie'
import PageContainer from '@components/PageContainer'

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
        <Prose>
          <p>{member.bungieNetUser.displayName}</p>
          <ul>
            {clans?.results?.map(({ group }) => (
              <li key={group.groupId}>
                <Link href={`/clans/${group.groupId}`} passHref>
                  <SmartLink>{group.name}</SmartLink>
                </Link>
              </li>
            ))}
          </ul>
          <Button
            href="/api/auth/signout"
            onClick={e => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </Button>
        </Prose>
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
