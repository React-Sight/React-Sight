module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/chrome-ext/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/chrome-ext/build/',
    '<rootDir>/chrome-ext/backend/installHook',
    '<rootDir>/chrome-ext/backend/common',
    '<rootDir>/chrome-ext/backend/fiber-hook',
    '<rootDir>/chrome-ext/backend/react-15-hook',
    '<rootDir>/chrome-ext/asset/',
    '<rootDir>/chrome-ext/backend/installHook.js',
    '<rootDir>/chrome-ext/background.js',
    '<rootDir>/chrome-ext/content-script.js',
    '<rootDir>/chrome-ext/frontend/devtools.js',
    '<rootDir>/chrome-ext/frontend/drawChart.js',
  ],
  transform: { '^.+\\.jsx?$': 'babel-jest' },
};
