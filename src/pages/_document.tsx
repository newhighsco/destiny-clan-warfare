import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class DocumentPage extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DocumentPage
