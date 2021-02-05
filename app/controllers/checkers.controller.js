const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Game history content can not be empty"
        });
    }

    // Create a Note
    const history = new History({
        Player1: req.body.player1, 
        Player2: req.body.Player2,
        Winner: req.body.Winner
    });

    // Save Note in the database
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

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};