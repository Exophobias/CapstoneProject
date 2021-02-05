module.exports = (app) => {
    const notes = require('../controllers/checkers.controller.js');

    // Create a new row with game history
    app.post('/checkers', checkers.create);

    // Retrieve all history (games)
    app.get('/checkers', checkers.findAll);

    // Retrieve the information of a single game
    app.get('/checkers/:noteId', checkers.findOne);

    // Update a game from history
    app.put('/checkers/:noteId', checkers.update);

    // Delete a game from history
    app.delete('/checkers/:noteId', checkers.delete);
}