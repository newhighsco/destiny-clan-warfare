import React, { useContext } from 'react'
import { AppContext } from '../contexts/App'
import NotFound from '../components/page/not-found/NotFound'

function NotFoundPage() {
  const { isEnhanced } = useContext(AppContext)

  return isEnhanced ? <NotFound /> : null
}

export default NotFoundPage
