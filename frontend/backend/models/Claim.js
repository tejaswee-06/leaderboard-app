const mongoose = require('mongoose');
const claimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pointsClaimed: Number,
  claimedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Claim', claimSchema);