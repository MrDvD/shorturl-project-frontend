export default {
  displayName: 'org',
  preset: './jest.preset.cjs',
  coverageDirectory: './coverage/org',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)',
  ],
};
