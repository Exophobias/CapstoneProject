
// Load program on web browser load
window.onload = function() {
    // Gameboard design. Every value > 0 = a checker piece and its respective ID
    var gameBoard = [
        [0, 1, 0, 2, 0, 3, 0, 4],
        [5, 0, 6, 0, 7, 0, 8, 0],
        [0, 9, 0, 10, 0, 11, 0, 12],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [13, 0, 14, 0, 15, 0, 16, 0],
        [0, 17, 0, 18, 0, 19, 0, 20],
        [21, 0, 22, 0, 23, 0, 24, 0]
    ];

    // 
    var pieces = [];
    var tiles = [];

    // Piece Object - 24 total pieces (instances) in the game (12 per side)
    // Includes functions for possible/valid moves, makeKing, etc.
    function Piece(element, position) {

        // Linked DOM (HTML) Element
        //this.element = element;

        // Gameboard is a 2-D array. Format is row #, then column position. Ex. [0][1]
        this.position = position;

        // Which player's piece?
        this.player = '';

        // Is the piece a king?
        this.isKing = false;

        // Assigns HTML elements (checker pieces) based on HTML element ID
        if(this.element.attr("id") < 13)
            this.player = 1;
        else
            this.player = 2;

        function move(tile) {

        }


    }

    function Board() {

    }
}