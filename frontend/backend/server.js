const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// ─── MONGOOSE SETUP ───────────────────────────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/leaderboardApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  points: { type: Number, default: 0 }
});

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pointsClaimed: Number,
  claimedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const ClaimHistory = mongoose.model('ClaimHistory', historySchema);

// Seed initial 10 users if none exist
async function seedUsers() {
  const count = await User.countDocuments();
  if (count === 0) {
    const names = [
      'Rahul', 'Kamal', 'Sanak', 'Priya', 'Anita',
      'Vikram', 'Deepa', 'Rohan', 'Nisha', 'Amit'
    ];
    await User.insertMany(names.map(n => ({ name: n })));
    console.log('Seeded 10 base users');
  }
}
seedUsers();

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// GET /users
// Returns all users sorted by points descending
app.get('/users', async (req, res) => {
  const users = await User.find().sort({ points: -1 });
  res.json(users);
});

// POST /users
// Adds a new user
app.post('/users', async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.json(newUser);
});

// POST /claim
// Awards random 1–10 points to the user, updates DB & records history
app.post('/claim', async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const points = Math.floor(Math.random() * 10) + 1;
  user.points += points;
  await user.save();

  const record = new ClaimHistory({
    user: user._id,
    pointsClaimed: points
  });
  await record.save();

  res.json({
    message: `${points} points claimed for ${user.name}`,
    userId: user._id,
    totalPoints: user.points
  });
});

// GET /history
// Returns all claim history, newest first
app.get('/history', async (req, res) => {
  const history = await ClaimHistory.find()
    .sort({ claimedAt: -1 })
    .populate('user', 'name');
  res.json(history);
});

// ─── START SERVER ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});