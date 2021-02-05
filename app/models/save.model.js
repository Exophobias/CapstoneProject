const mongoose = require('mongoose');

const checkers = mongoose.Schema({
    Player1: String,
    Player2: String,
    Winner: String
}, {
    timestamps: true
});

module.exports = mongoose.model('History', checkers);