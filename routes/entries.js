const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

router.post('/add', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.json({ message: 'Entry saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
