const History = require('../models/save.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.winner) {
        return res.status(400).send({
            message: "Player1, Player2, and a Winner must be specified."
        });
    }

    // Create a game-history record
    const history = new History({
        Player1: req.body.Player1, 
        Player2: req.body.Player2,
        Winner: req.body.Winner
    });

    // Save record to the database
    history.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the record."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    History.find()
    .then(history => {
        res.send(history);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving game history."
        });
    });
};