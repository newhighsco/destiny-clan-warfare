import React from 'react'

require('dotenv').config({ path: `./.env.${process.env.NODE_ENV || 'development'}` })

const moment = require('moment')

exports.onRenderBody = ({ setHeadComponents, pathname = `/` }) => {
  const url = `${process.env.SITE_URL}${pathname}`
  const updatedDate = moment.utc().format()

  setHeadComponents([
    <meta name="og:url" key="ogUrl" content={url} />,
    <meta name="og:updated_time" key="ogUpdatedTime" content={updatedDate} />
  ])
}
