import React from 'react'
import RSS from 'rss'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

export default (feeds = []) => {
  return {
    headElements: async (elements, state) => {
      const headElements = [...elements]

      feeds
        .filter(({ addToHead }) => addToHead)
        .map(({ filename }) => {
          headElements.push(
            <link
              rel="alternate"
              type="application/rss+xml"
              href={`/${filename}`}
            />
          )
        })

      return headElements
    },
    afterExport: async state => {
      const {
        config: {
          paths: { DIST },
          siteRoot
        },
        routes
      } = state

      await Promise.all(
        feeds.map(async feed => {
          const { filename, filter, embellisher, ...options } = feed
          const rss = new RSS({
            ...options,
            site_url: siteRoot
          })
          const feedRoutes = filter ? routes.filter(filter) : routes

          feedRoutes.map(route => {
            const embellishedRoute = embellisher ? embellisher(route) : route

            rss.item(embellishedRoute)
          })

          console.log(`Generating ${filename}...`)

          await fs.writeFile(path.join(DIST, filename), rss.xml())

          console.log(chalk.green(`[\u2713] ${filename} generated`))
        })
      )

      return state
    }
  }
}
