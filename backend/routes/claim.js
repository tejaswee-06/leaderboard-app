const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const points = Math.floor(Math.random() * 10) + 1;
  user.points += points;
  await user.save();

  const claim = new Claim({ user: user._id, pointsClaimed: points });
  await claim.save();

  res.json({ success: true, points });
});

router.get('/history', async (req, res) => {
  const history = await Claim.find().populate('user').sort({ claimedAt: -1 });
  res.json(history);
});

module.exports = router;