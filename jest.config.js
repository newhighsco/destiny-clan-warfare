const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

module.exports = (async () => {
  const config = await createJestConfig({
    collectCoverage: true,
    collectCoverageFrom: ['src/components/**/*.tsx'],
    coveragePathIgnorePatterns: ['.stories.tsx'],
    moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@config$': '<rootDir>/site.config',
      '^@fixtures/(.*)$': '<rootDir>/src/__mocks__/fixtures//$1',
      '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
      '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
      '^@images/(.*)$': '<rootDir>/src/images/$1',
      '^@libs/(.*)$': '<rootDir>/src/libs/$1',
      '^@pages/(.*)$': '<rootDir>/src/pages/$1',
      '^@styles/(.*)$': '<rootDir>/src/styles/$1',
      '^@theme$': '<rootDir>/theme'
    },
    setupFilesAfterEnv: ['<rootDir>/config/jest/setup.js'],
    testEnvironment: 'jest-environment-jsdom'
  })()

  config.moduleNameMapper = {
    '^.+\\.(svg)$': '<rootDir>/config/jest/__mocks__/svgMock.js',
    ...config.moduleNameMapper
  }
  config.transformIgnorePatterns.splice(
    0,
    1,
    '/node_modules/(?!@newhighsco/chipset).+'
  )

  return config
})()
