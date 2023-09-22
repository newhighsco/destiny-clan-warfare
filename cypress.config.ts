import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  video: false,
  e2e: {
    baseUrl: 'https://localhost:9000'
  }
})
