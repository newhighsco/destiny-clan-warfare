import { defineConfig } from 'cypress'

const DOMAIN = 'destiny-clan-warfare.netlify.app'

const baseUrl = (): string => {
  if (process.env.CIRCLE_PULL_REQUEST) {
    return `https://deploy-preview-${process.env.CIRCLE_PR_NUMBER.split(
      '/'
    ).pop()}--${DOMAIN}`
  }

  if (process.env.CIRCLE_BRANCH) {
    return `https://${process.env.CIRCLE_BRANCH}--${DOMAIN}`
  }

  return 'https://localhost:9000'
}

export default defineConfig({
  fixturesFolder: false,
  video: false,
  e2e: { baseUrl: baseUrl() }
})
