const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// Middleware to check login
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

router.get('/', requireLogin, async (req, res) => {
  const entries = await Entry.find({ userId: req.session.userId });
  // render entries page and pass `entries`
});

router.post('/add-entry', requireLogin, async (req, res) => {
  const { title, content, emotion } = req.body;
  const entry = new Entry({
    title,
    content,
    emotion,
    date: new Date(),
    userId: req.session.userId
  });
  await entry.save();
  res.redirect('/');
});

module.exports = router;
