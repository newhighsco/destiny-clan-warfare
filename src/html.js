import React, { Component } from 'react'
import PropTypes from 'prop-types'

var stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

var modernizrStr
try {
  modernizrStr = require(`!raw-loader!../public/modernizr.js`)
} catch (e) {
  console.log(e)
}

class Html extends Component {
  render () {
    var css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }
    var modernizr = (
      <script
        dangerouslySetInnerHTML={{ __html: modernizrStr }}
      />
    )
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          {this.props.headComponents}
          {css}
          {modernizr}
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
          <script src="/disable-sw.js" />
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
