// tests/setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  // Create fresh in-memory DB instance
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Force new connection
  await mongoose.disconnect();
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });
}, 30000); // 30-second timeout

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

// Clean collections between tests
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});