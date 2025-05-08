/* eslint-disable */
export default {
  displayName: 'skattframtal',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|json)$)': '@nx/react/plugins/jest',
    '\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: `${__dirname}/babel-jest.config.json` },
    ],
    '\\.css\\.ts$': '@vanilla-extract/jest-transform',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageReporters: ['json', 'text', 'html'],
  coverageDirectory: '../../coverage/apps/skattframtal',
  setupFilesAfterEnv: [`${__dirname}/jest.setup.ts`],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '/graphql/'],
  detectLeaks: false,
}
