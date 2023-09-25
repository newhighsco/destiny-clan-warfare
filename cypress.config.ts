import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  video: false,
  e2e: {
    baseUrl: process.env.CIRCLECI
      ? process.env.CIRCLE_PR_NUMBER
        ? `https://deploy-preview-${process.env.CIRCLE_PR_NUMBER}--destiny-clan-warfare.netlify.app`
        : `https://${process.env.CIRCLE_BRANCH}--destiny-clan-warfare.netlify.app`
      : 'https://localhost:9000'
  }
})
