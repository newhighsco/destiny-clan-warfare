import { resolve } from 'path'
import {
  copySync,
  ensureDirSync,
  emptyDirSync,
  existsSync,
  readdirSync
} from 'fs-extra'
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
          if (!existsSync(path)) {
            ensureDirSync(path)

            const source = resolve(cacheDestination, name)

            if (existsSync(source)) {
              const sourceFiles = readdirSync(source)

              copySync(source, path)

              console.log(
                chalk`Restored {bold ${path}} <= {bold ${source}} {gray ${
                  sourceFiles.length
                } items}`
              )
            } else {
              console.log(
                chalk`{yellow Skipped {bold ${path}}} {gray not previously cached}`
              )
            }
          } else {
            console.log(
              chalk`{yellow Skipped {bold ${path}}} {gray non-empty directory}`
            )
          }
        })

        state.isCacheRestored = true

        console.log(chalk`{green [\u2713] Netlify cache restored}`)
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
          emptyDirSync(destination)
          copySync(path, destination)

          console.log(
            chalk`Cached {bold ${path}} => {bold ${destination}} {gray ${
              sourceFiles.length
            } items}`
          )
        } else {
          console.log(
            chalk`{yellow Skipped {bold ${path}}} {gray non-existent directory}`
          )
        }
      })

      console.log(chalk`{green [\u2713] Netlify cache filled}`)

      return state
    }
  }
}
