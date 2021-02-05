const express = require('express');
const bodyParser = require('body-parser');

// Creates the express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Database configuration
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Database connection
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Defines a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Simple Checkers. Play a round or two!"});
});

// Require routes
require('./app/routes/checkers.routes.js')(app);

// Listen for requests
app.listen(80, () => {
    console.log("Server is listening on port '80'");
});