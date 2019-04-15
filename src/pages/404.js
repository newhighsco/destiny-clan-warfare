import React, { useState, useEffect } from 'react'
import NotFound from '../components/not-found/NotFound'

function NotFoundPage () {
  const [ active, setActive ] = useState(false)

  useEffect(() => {
    setActive(true)
  })

  return active ? (
    <NotFound />
  ) : null
}

export default NotFoundPage
