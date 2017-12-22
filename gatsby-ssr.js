import React from 'react'

require('dotenv').config()

const moment = require('moment')

exports.onRenderBody = ({ setHeadComponents, pathname = `/` }) => {
  const url = `${process.env.GATSBY_SITE_URL}${pathname}`
  const updatedDate = moment.utc().format()

  setHeadComponents([
    <meta property="og:url" key="ogUrl" content={url} />,
    <meta property="og:updated_time" key="ogUpdatedTime" content={updatedDate} />
  ])
}
