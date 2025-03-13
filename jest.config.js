// jest.config.js
module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 30000,
    modulePaths: ['<rootDir>/src'],
    testPathIgnorePatterns: ['/node_modules/']
  };