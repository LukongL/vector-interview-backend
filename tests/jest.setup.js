// tests/jest.setup.js
const mongoose = require('mongoose');

// Silence Mongoose deprecation warnings
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockImplementation((uri, options) => {
      return actualMongoose.connect(uri, {
        ...options,
        useNewUrlParser: false, // Explicitly disable deprecated options
        useUnifiedTopology: false
      });
    })
  };
});