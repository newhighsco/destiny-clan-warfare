import React from 'react'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

export default (options = {}) => {
  const filename = 'robots.txt'
  const sitemapFilename = 'sitemap.xml'
  const showSitemap = options.showSitemap

  return ({
    headElements: async (elements, state) => {
      return [
        ...elements,
        showSitemap && <link rel="sitemap" type="application/xml" href={`/${sitemapFilename}`} />
      ]
    },
    afterExport: async state => {
      const { disallowAll } = options
      const {
        config: {
          paths: { DIST },
          siteRoot
        }
      } = state
      const robots = [ 'User-agent: *' ]

      if (disallowAll) robots.push('Disallow: /')
      if (showSitemap && siteRoot) robots.push(`Sitemap: ${siteRoot}/${sitemapFilename}`)

      console.log(`Generating ${filename}...`)

      await fs.writeFile(path.join(DIST, filename), robots.join('\n'))

      console.log(chalk.green(`[\u2713] ${filename} generated`))

      return state
    }
  })
}
