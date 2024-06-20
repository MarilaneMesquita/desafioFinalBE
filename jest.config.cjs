module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.(test|spec).js'],
  restoreMocks: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
