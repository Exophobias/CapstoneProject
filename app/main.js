
// Initialize gameboard
var board = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
  ];

// 
var pieces = [];
var tiles = [];

// Piece Object - 24 total pieces in the game (12 per side)
function Piece(element, position) {

    // Linked DOM (HTML) Element
    this.element = element;

    // Gameboard is a 2-D array. Format is row #, then column position. Ex. [0][1]
    this.position = position;

    // Which player's piece?
    this.player = '';

    // Assigns HTML elements (checker pieces) based on HTML element ID
    if(this.element.attr("id") < 12)
        this.player = 1;
    else
        this.player = 2;

    
}