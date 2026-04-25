/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.ts', '!src/app.ts'],
  coverageDirectory: 'coverage',
  verbose: true,
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: {
        ignoreDiagnostics: [5107],
      },
    }],
  },
};
