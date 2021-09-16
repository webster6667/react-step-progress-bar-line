const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif)$": "<rootDir>/tests/mocks/file-mock.ts"
    }
}