/* eslint-disable */
export default {
  displayName: 'services-skattskil',
  preset: './jest.preset.js',
  rootDir: '../../../',
  roots: [__dirname],
  detectLeaks: false,
  globalSetup: `${__dirname}/test/globalSetup.ts`,
  globalTeardown: `${__dirname}/test/globalTeardown.ts`,
  setupFiles: [],
  setupFilesAfterEnv: [`${__dirname}/test/setup.ts`],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: `${__dirname}/tsconfig.spec.json`,
        isolatedModules: true,
      },
    ],
  },
  collectCoverageFrom: [
    '<rootDir>/apps/services/skattskil/**/*.ts',
    '!<rootDir>/apps/services/skattskil/**/*.spec.ts',
  ],
  coverageReporters: ['json', 'text', 'html'],
  coverageDirectory: '<rootDir>/coverage/apps/services/skattskil',
}
