import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { useSession, signOut } from 'next-auth/client'
import { Button } from '@newhighsco/chipset'
import { getUser } from '@libs/bungie'
import PageContainer, { PageContainerProps } from '@components/PageContainer'

const HomePage: React.FC<PageContainerProps> = ({ meta }) => {
  const [session] = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        setUser(await getUser(session.membershipId as string))
      }

      fetchUser()
    }
  }, [session])

  return (
    <PageContainer meta={meta}>
      {user && (
        <>
          <p>Signed in as: {session.user.name}</p>
          <Button
            href="/api/auth/signout"
            onClick={e => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </Button>
          <pre>{JSON.stringify(user, null, 1)}</pre>
        </>
      )}
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {}
    }
  }
}

export default HomePage
