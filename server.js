const express = require('express');
const bodyParser = require('body-parser');

// Creates the express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Defines a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Simple Checkers. Play a round or two!"});
});

// Listen for requests
app.listen(80, () => {
    console.log("Server is listening on port '80'");
});