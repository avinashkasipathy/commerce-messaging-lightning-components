const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    ...jestConfig,
    passWithNoTests: true,
    moduleNameMapper: {},
    setupFilesAfterEnv,
    preset: '@lwc/jest-preset',
    moduleFileExtensions: ['js', 'html'],
};
