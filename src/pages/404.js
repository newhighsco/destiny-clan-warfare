import React, { useContext } from 'react'
import { AppContext } from '../contexts/App'
import PageNotFound from '../components/page/not-found/NotFound'

function NotFoundPage() {
  const { isEnhanced } = useContext(AppContext)

  return isEnhanced ? <PageNotFound /> : null
}

export default NotFoundPage
