module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [ 'src/components/**/*.js' ],
  coveragePathIgnorePatterns: [ '.stories.js' ],
  coverageReporters: [ 'text' ],
  moduleNameMapper: {
    '\\.(styl)$': 'identity-obj-proxy',
    '\\.(svg)$': 'jest-svg-transformer',
    '\\.(png|jpg|gif|eot|ttf|woff(2)?)$': '<rootDir>/src/utils/file-transform.js'
  },
  setupFiles: [ '<rootDir>/src/utils/setup-tests.js' ],
  verbose: false
}
