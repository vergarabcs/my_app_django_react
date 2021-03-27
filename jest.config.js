'use strict';

module.exports = {
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/*',
  ],
  modulePaths: [
    'src',
    'src/js',
    'src/js/app',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFiles: [
    './jest-setup.js',
  ],
  collectCoverageFrom: [
    'src/js/**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    'src/js/store.js',
    'src/js/index.js',
    'src/js/jquery-index.js',
    'src/js/constants/*',
    'src/js/pages/*',
    'src/js/tests/*',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
    },
  },
};
