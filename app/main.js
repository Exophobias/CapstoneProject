
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
        this.element = element;

        // Gameboard is a 2-D array. Format is row #, then column position. Ex. [0][1]
        this.position = position;

        // Which player's piece?
        this.player = '';

        // On initializaiton, all pieces are allowed to move as there is no jump
        this.allowedToMove = true;

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

    function Tile(element, position) {

        // Linked DOM (HTML) Element
        this.element = element;

        // Gameboard is a 2-D array. Format is row #, then column position. Ex. [0][1]
        this.position = position;
    }

    // Controls the logistics and of the game
    var Board = {

        board: gameBoard, // Maps board to gameBoard object
        score: {
            player1: 0,
            player2: 0
        },
        playerTurn: 1,
        jumpexist: false,
        tilesElement: $('div.tiles'),
        dictionary: ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"],

        // Initialize the 8x8 gameBoard in the HTML 
        initialize: function() {
            var countPieces = 0;
            var countTiles = 0;
            for (let row in this.board) { // Row (x) is the first index [x]
                for (let column in this.board[row]) { // Column (y) is the second index [][y]
                
                // Grabs the row and mod divides it, if it == 1 and then the column == 1, then there is
                // a row and column intersection. At that intersection, a zero will be there. (Non piece)
                if (row % 2 == 1) {
                    if (column % 2 == 0)
                        countTiles = this.tileRender(row, column, countTiles)
                } else {
                    if (column % 2 == 1) 
                        countTiles = this.tileRender(row, column, countTiles)
                }

                // If [x][y] does not equal 0 and is below 13 (1-12), then its a player 1 piece
                // The same but if the value at [x][y] is above 12, then its a player 2 piece
                if (this.board[row][column] > 0 && this.board[row][column] < 13)
                    countPieces = this.renderPlayerPieces(1, row, column, countPieces)
                else if (this.board[row][column] > 0 && 12 < this.board[row][column] < 25)
                    countPieces = this.renderPlayerPieces(2, row, column, countPieces)
                }
            }
        },

        // This populates the tile HTML elements within the index.html. Called in initialize function
        tileRender: function(row, column, countTiles) {
            this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
            tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]);
            return countTiles + 1
        },

        // Populates the player HTML elements based on player number given. Called in initialize function
        renderPlayerPieces: function(playerNumber, row, column, countPieces) {
            $(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
            pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)]);
            return countPieces + 1;
          },

        // Checks if location (tile) has an object (piece) in that location
        isValidMove: function(row, column) {
            // Check if row and column is within boundss of the gameboard
            if (row < 0 || row > 7 || column < 0 || column > 7)
                return false;
            
            // If location in 2D array == 0, then no piece is there. Valid move
            if (this.board[row][column] == 0)
                return true;
            return false;
        },

        changePlayerTurn: function() {
            this.playerTurn == 1 ?
            this.playerTurn = 2 :
            this.playerTurn = 1
        }
    }
    Board.initialize();
}