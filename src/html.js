import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Html extends Component {
  render () {
    const { Html, Head, Body, children } = this.props

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <Body>{children}</Body>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      </Html>
    )
  }
}

Html.propTypes = {
  Html: PropTypes.func,
  Head: PropTypes.func,
  Body: PropTypes.func,
  children: PropTypes.node
}

export default Html
