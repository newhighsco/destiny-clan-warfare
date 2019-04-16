import React from 'react'
import WebpackPwaManifest from 'webpack-pwa-manifest'

export default (options = {}) => {
  const filename = options.filename || 'manifest.json'
  const iconDestination = 'static'

  return {
    webpack: config => {
      if (options.icons) {
        options.icons = options.icons.map(
          ({ destination = iconDestination, ...rest }) => ({
            ...rest,
            destination
          })
        )
      }

      config.plugins.push(new WebpackPwaManifest({ ...options, filename }))

      return config
    },
    headElements: async (elements, state) => {
      const themeColor = options.theme_color

      return [
        ...elements,
        <link rel="manifest" href={`/${filename}`} />,
        themeColor && <meta name="theme-color" content={themeColor} />
      ]
    }
  }
}
