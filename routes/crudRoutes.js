const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const getCollection = (req) => req.app.locals.db.collection('users');

router.post('/insertOne', async (req, res) => {
  try {
    const collection = getCollection(req);
    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/insertMany', async (req, res) => {
  try {
    const collection = getCollection(req);
    const result = await collection.insertMany(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/updateOne/:id', async (req, res) => {
  try {
    const collection = getCollection(req);
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/updateMany', async (req, res) => {
  try {
    const collection = getCollection(req);
    const { filter, update } = req.body;
    const result = await collection.updateMany(filter, { $set: update });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/replaceOne/:id', async (req, res) => {
  try {
    const collection = getCollection(req);
    const result = await collection.replaceOne(
      { _id: new ObjectId(req.params.id) },
      req.body
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteOne/:id', async (req, res) => {
  try {
    const collection = getCollection(req);
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteMany', async (req, res) => {
  try {
    const collection = getCollection(req);
    const result = await collection.deleteMany(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/find', async (req, res) => {
  try {
    const collection = getCollection(req);
    const { filter = {}, projection = {} } = req.query;

    const parsedFilter = filter ? JSON.parse(filter) : {};
    const parsedProjection = projection ? JSON.parse(projection) : {};

    const data = await collection.find(parsedFilter).project(parsedProjection).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error in find:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
