import React from 'react'

require('dotenv').config()

exports.onRenderBody = ({ setHeadComponents, pathname = `/` }) => {
  const url = `${process.env.GATSBY_SITE_URL}${pathname}`

  setHeadComponents([
    <meta property="og:url" key="ogUrl" content={url} />
  ])
}
