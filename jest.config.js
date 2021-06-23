module.exports = {
  preset: 'ts-jest',
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['packages/**/src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'ts'],
  testMatch: [
    '**/__tests__/*.spec.+(ts|js)',
    '**/*.test.+(ts|js)',
    '**/*.spec.+(ts|js)',
    '**/__tests__/*/*.spec.+(ts|js)',
  ],
  coverageThreshold: {
    // global: {
    //   branches: 80,
    //   functions: 80,
    //   lines: 80,
    //   statements: 80,
    // },
  },
};
