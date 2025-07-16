const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/leaderboard');

const names = ['Rahul', 'Kamal', 'Sanak', 'Ishita', 'Ravi', 'Pooja', 'Amit', 'Sneha', 'Vikram', 'Neha'];
const users = names.map(name => ({ name }));

User.insertMany(users)
  .then(() => console.log('Users seeded'))
  .finally(() => mongoose.disconnect());