import { resolve } from 'path'
import { ensureDirSync, existsSync, readdirSync, copySync } from 'fs-extra'
import chalk from 'chalk'

export default ({ extraDirs = [] }) => {
  const cacheDestination = resolve(
    process.env.NETLIFY_BUILD_BASE,
    'cache',
    'react-static'
  )

  const directoriesToCache = state => {
    const {
      config: {
        paths: { ROOT }
      }
    } = state

    const defaultDirs = []

    const dirs = [
      ...defaultDirs.map(dir => ({ name: dir, path: resolve(ROOT, dir) })),
      ...extraDirs.map(dir => ({ name: dir, path: resolve(ROOT, dir) }))
    ]

    ensureDirSync(cacheDestination)

    return {
      dirs,
      cacheDestination
    }
  }

  return {
    beforePrepareRoutes: state => {
      if (!process.env.NETLIFY_BUILD_BASE) {
        return state
      }

      const { isCacheRestored } = state

      if (!isCacheRestored) {
        console.log('Restoring Netlify cache...')

        const { dirs, cacheDestination } = directoriesToCache(state)

        dirs.map(({ name, path }) => {
          ensureDirSync(path)

          const source = resolve(cacheDestination, name)

          if (existsSync(source)) {
            const sourceFiles = readdirSync(source)
            const destinationFiles = readdirSync(path)

            copySync(source, path)

            console.log(
              chalk`Copied {bold ${
                sourceFiles.length
              }} cached items from {bold ${source}} to {bold ${path}} which contained {bold ${
                destinationFiles.length
              }} existing items.`
            )
          } else {
            console.log(
              chalk`{yellow WARNING skipped empty cached directory {bold ${source}}}`
            )
          }
        })

        state.isCacheRestored = true

        console.log(chalk.green('[\u2713] Netlify cache restored'))
      }

      return state
    },
    afterExport: async state => {
      if (!process.env.NETLIFY_BUILD_BASE) {
        return state
      }

      console.log('Filling Netlify cache...')

      const { dirs, cacheDestination } = directoriesToCache(state)

      dirs.map(({ name, path }) => {
        if (existsSync(path)) {
          const sourceFiles = readdirSync(path)
          const destination = resolve(cacheDestination, name)

          ensureDirSync(destination)

          const destinationFiles = readdirSync(destination)

          copySync(path, destination)

          console.log(
            chalk`Copied {bold ${
              sourceFiles.length
            }} items from {bold ${path}} to {bold ${destination}} which contains {bold ${
              destinationFiles.length
            }} existing cached items.`
          )
        } else {
          console.log(chalk`{yellow WARNING missing directory {bold ${path}}}`)
        }
      })

      console.log(chalk.green('[\u2713] Netlify cache filled'))

      return state
    }
  }
}
