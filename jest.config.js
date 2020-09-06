module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__tests__/jest/__mocks__/styleMock.js',
  },
}
