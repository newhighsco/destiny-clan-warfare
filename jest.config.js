module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.js'],
  coveragePathIgnorePatterns: ['.stories.js'],
  moduleNameMapper: {
    '\\.(styl)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/__mocks__/svg.js',
    '\\.(png|jpg|gif|eot|ttf|woff(2)?)$':
      '<rootDir>/config/jest/file-transform.js'
  },
  setupFiles: ['<rootDir>/config/jest/setup-tests.js'],
  verbose: false
}
