const express = require('express');
const router = express.Router();

router.get('/cursor-users', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('users'); 

    const cursor = collection.find(); 

    let users = [];
    await cursor.forEach(doc => {
      users.push(doc);
    });

    res.json(users);
  } catch (error) {
    console.error('Error using cursor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/aggregation-stats', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('users'); 

    const stats = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          avgAge: { $avg: "$age" }, 
        }
      }
    ]).toArray();

    res.json(stats[0] || {});
  } catch (error) {
    console.error('Error with aggregation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
