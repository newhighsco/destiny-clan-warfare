import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import PageContainer from '@components/PageContainer'

interface ClanPageProps {
  id: string
}

const ClanPage: React.FC<ClanPageProps> = ({ id }) => {
  const { isFallback } = useRouter()

  return (
    <PageContainer>
      <div>ID: {id}</div>
      <footer>{isFallback ? 'loading' : 'cached'}</footer>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      // TODO: Load data from API
      id: params.id
    }
    // TODO: Not currently supported by Next on Netlify
    // revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Only load top clans
  const clans = [`123`, `234`, `345`]
  const paths = clans.map(id => ({
    params: { id }
  }))

  return { paths, fallback: true }
}

export default ClanPage
