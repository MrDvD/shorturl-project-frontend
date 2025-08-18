const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                stringifyContentPathRegex: '\\.html$',
            }
        ]
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
