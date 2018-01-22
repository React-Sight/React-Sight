module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/chrome-ext/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/chrome-ext/build/',
    '<rootDir>/chrome-ext/backend/',
    '<rootDir>/chrome-ext/asset/',
    '<rootDir>/chrome-ext/backend/installHook.js',
    '<rootDir>/chrome-ext/background.js',
    '<rootDir>/chrome-ext/content-script.js',
    '<rootDir>/chrome-ext/frontend/devtools.js',
    '<rootDir>/chrome-ext/frontend/drawChart.js',
  ],
};
