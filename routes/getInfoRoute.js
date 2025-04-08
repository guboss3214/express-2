const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const userInfo = await User.find({});
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }
    console.log('Fetched user info:', userInfo);
    res.render('getInfo', { title: 'Get Info', info: userInfo });
  } catch (error) {
    console.error('Error fetching info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;