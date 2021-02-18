module.exports = (app) => {
    const history = require('../controllers/checkers.controller.js');

    // Create a new row with game history
    app.post('/checkers', history.create);

    // Retrieve all history (games)
    app.get('/checkers', history.findAll);
}