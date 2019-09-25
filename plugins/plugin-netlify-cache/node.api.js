import { resolve, basename } from 'path'
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

  const directoriesToCache = (state, stage) => {
    const {
      isBuildCommand,
      config: {
        paths: { ARTIFACTS, DIST, ROOT }
      }
    } = state

    const internalDirs = [ARTIFACTS, DIST]
    const dirs = []

    if (stage !== 'bundle') {
      dirs.push(
        ...extraDirs.map(dir => ({ name: dir, path: resolve(ROOT, dir) }))
      )
    }

    if (stage === 'bundle' || (stage === 'restore' && !isBuildCommand)) {
      dirs.push(
        ...internalDirs.map(dir => ({ name: basename(dir), path: dir }))
      )
    }

    ensureDirSync(cacheDestination)

    return {
      dirs,
      cacheDestination
    }
  }

  const fillCache = ({ dirs, cacheDestination }) => {
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
  }

  return {
    beforePrepareRoutes: state => {
      if (!process.env.NETLIFY_BUILD_BASE) {
        return state
      }

      const { isCacheRestored } = state

      if (!isCacheRestored) {
        console.log('Restoring Netlify cache...')

        const { dirs, cacheDestination } = directoriesToCache(state, 'restore')

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
    afterBundle: async state => {
      if (!process.env.NETLIFY_BUILD_BASE) {
        return state
      }

      console.log('Filling Netlify cache...')

      fillCache(directoriesToCache(state, 'bundle'))

      console.log(chalk`{green [\u2713] Netlify cache filled}`)

      return state
    },
    afterExport: async state => {
      if (!process.env.NETLIFY_BUILD_BASE) {
        return state
      }

      console.log('Filling Netlify cache...')

      fillCache(directoriesToCache(state, 'export'))

      console.log(chalk`{green [\u2713] Netlify cache filled}`)

      return state
    }
  }
}
