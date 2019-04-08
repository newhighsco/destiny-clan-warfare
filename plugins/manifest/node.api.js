import React from 'react'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

export default (options = {}) => {
  const filename = options.filename || 'manifest.webmanifest'

  return ({
    headElements: async (elements, state) => {
      const { themeColor } = options

      return [
        ...elements,
        <link rel="manifest" href={`/${filename}`} />,
        <meta name="theme-color" content={themeColor} />
      ]
    },
    afterExport: async state => {
      const { name, shortName, themeColor } = options
      const {
        config: {
          paths: { DIST }
        }
      } = state
      const manifest = {
        name,
        short_name: shortName,
        start_url: `/`,
        background_color: themeColor,
        theme_color: themeColor,
        display: `minimal-ui`,
        icons: [
          {
            src: `/favicon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/favicon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }

      console.log(`Generating ${filename}...`)

      await fs.writeFile(path.join(DIST, filename), JSON.stringify(manifest))

      console.log(chalk.green(`[\u2713] ${filename} generated`))

      return state
    }
  })
}
