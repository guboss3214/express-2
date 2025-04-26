const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL;

const connectDB = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  console.log('MongoDB connected...');
  return client;
};

module.exports = connectDB;