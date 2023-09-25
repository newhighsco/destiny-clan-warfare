const hq = require('alias-hq')
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

module.exports = (async () => {
  const config = await createJestConfig({
    collectCoverage: true,
    collectCoverageFrom: ['src/components/**/*.tsx'],
    coveragePathIgnorePatterns: ['.stories.tsx'],
    moduleNameMapper: {
      '^.+\\.(svg)$': '<rootDir>/config/jest/__mocks__/svgMock.ts',
      ...hq.get('jest', { format: 'array' })
    },
    setupFilesAfterEnv: ['<rootDir>/config/jest/setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['<rootDir>/.netlify/', '<rootDir>/node_modules/'],
    reporters: [
      'default',
      ['jest-junit', { outputDirectory: 'reports', outputName: 'jest.xml' }]
    ]
  })()

  config.transformIgnorePatterns.splice(
    0,
    1,
    '/node_modules/(?!@newhighsco/chipset).+'
  )

  return config
})()
