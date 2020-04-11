module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/extension/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/extension/build/',
    '<rootDir>/extension/backend/installHook',
    '<rootDir>/extension/backend/common',
    '<rootDir>/extension/backend/fiber-hook',
    '<rootDir>/extension/backend/react-15-hook',
    '<rootDir>/extension/asset/',
    '<rootDir>/extension/backend/installHook.js',
    '<rootDir>/extension/background.js',
    '<rootDir>/extension/content-script.js',
    '<rootDir>/extension/frontend/devtools.js',
    '<rootDir>/extension/frontend/drawChart.js',
  ],
  transform: { '^.+\\.jsx?$': 'babel-jest' },
};
