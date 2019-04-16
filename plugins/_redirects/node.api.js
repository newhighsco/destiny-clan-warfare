import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

export default (redirects = []) => {
  const filename = '_redirects'

  return {
    afterExport: async state => {
      const {
        config: {
          paths: { DIST }
        },
        routes
      } = state

      routes
        .filter(({ _redirects }) => _redirects)
        .map(({ _redirects }) => redirects.push(..._redirects))

      console.log(`Generating ${filename}...`)

      await fs.writeFile(
        path.join(DIST, filename),
        redirects
          .map(({ from, to, code }) => `${from} ${to} ${code}`)
          .join('\n')
      )

      console.log(chalk.green(`[\u2713] ${filename} generated`))

      return state
    }
  }
}
