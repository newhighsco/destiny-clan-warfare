import React from 'react'
import { string } from 'prop-types'
import { useRouter } from 'next/router'

const ClanPage = ({ id }) => {
  const { isFallback } = useRouter()

  return (
    <div>
      <div>ID: {id}</div>
      <footer>{isFallback ? 'loading' : 'cached'}</footer>
    </div>
  )
}

ClanPage.propTypes = {
  id: string
}

export async function getStaticProps({ params }) {
  return {
    props: {
      // TODO: Load data from API
      id: params.id
    }
    // TODO: Not currently supported by Next on Netlify
    // revalidate: 60
  }
}

export async function getStaticPaths() {
  // TODO: Only load top clans
  const clans = [`123`, `234`, `345`]
  const paths = clans.map(id => ({
    params: { id }
  }))

  return { paths, fallback: true }
}

export default ClanPage
