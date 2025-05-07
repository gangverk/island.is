/* eslint-disable */
export default {
  displayName: 'services-skattskil',
  preset: './jest.preset.js',
  rootDir: '../../../',
  roots: [__dirname],
  detectLeaks: false,
  globalSetup: `${__dirname}/test/globalSetup.ts`,
  globalTeardown: `${__dirname}/test/globalTeardown.ts`,
  setupFiles: [`${__dirname}/test/environment.ts`],
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
  coverageDirectory: '<rootDir>/coverage/apps/services/skattskil',
}
