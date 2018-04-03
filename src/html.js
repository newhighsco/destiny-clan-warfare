import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const constants = require('./utils/constants')

class Html extends Component {
  render () {
    const { Html, Head, Body, children, routeInfo } = this.props
    const canonicalPath = routeInfo && routeInfo.path !== '404' ? (routeInfo.path.match(/\/$/) ? routeInfo.path : `${routeInfo.path}/`) : null
    const canonicalUrl = `${process.env.SITE_URL}${canonicalPath === '/' ? canonicalPath : `/${canonicalPath}`}`

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="alternate" type="application/rss+xml" href="/events.xml" />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content={constants.meta.themeColor} />
          {canonicalPath &&
            <Fragment>
              <link rel="canonical" href={canonicalUrl} />
              <meta property="og:url" key="ogUrl" content={canonicalUrl} />
            </Fragment>
          }
        </Head>
        <Body>
          {children}
        </Body>
        {constants.meta.trackingId &&
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '${constants.meta.trackingId}', 'auto');ga('send', 'pageview');`
            }}
          />
        }
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      </Html>
    )
  }
}

Html.propTypes = {
  Html: PropTypes.func,
  Head: PropTypes.func,
  Body: PropTypes.func,
  children: PropTypes.node,
  routeInfo: PropTypes.object
}

export default Html
