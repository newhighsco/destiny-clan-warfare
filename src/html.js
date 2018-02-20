import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Html extends Component {
  render () {
    var css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <link rel="stylesheet" href="/styles.css" />
      )
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
          />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.node.isRequired,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired
}

export default Html
