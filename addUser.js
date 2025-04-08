require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = require('./db/connectDB');

connectDB();

async function addUser(name, email, age) {
  try {
    const user = new User({ name, email, age });
    await user.save();
    console.log('🎉 User added:', user);
  } catch (err) {
    console.error('❌ Error adding user:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

const [,, name, email, age] = process.argv;

if (!name || !email) {
  console.log('⚠️ Usage: node addUser.js <name> <email> [age]');
  process.exit(1);
}

connectDB().then(() => addUser(name, email, age));
