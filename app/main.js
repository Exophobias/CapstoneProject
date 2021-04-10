
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

    // Initial player turn. Changes to other player on valid move
    playerTurn = 1;
    lastPlayerTurn = 2;
    isAnySelected = false;

    // Piece Object - 24 total pieces (instances) in the game (12 per side)
    // Includes functions for possible/valid moves, makeKing, etc.
    function Piece(element, position) {

        // Linked DOM (HTML) Element
        this.element = element;

        // Gameboard is a 2-D array. Format is row #, then column #. Ex. [0][7] = 4
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

        this.move = function(tile) {

            // This makes sure that the player is going in the correct direction if the piece
            // is not a king.
            if (Board.isValidMove(tile.position[0], !tile.position[1])) 
                return false;
            
            // This makes sure the move is valid if the piece is not a king
            if (this.player == 1 && !this.king) {
                // If tile row # is less than its current position's row # and its NOT a king. Its not allowed to move backwards
                if (tile.position[0] < this.position[0]) 
                    return false;
            } else if (this.player == 2 && !this.king) {
                // If tile row # is greater than its current position's row # and its NOT a king. Its not allowed to move backwards
                 if (tile.position[0] > this.position[0]) 
                    return false;
            }

            // Sets the position in the 2D array to zero (= 0) so that the spot is now empty
            Board.board[this.position[0]][this.position[1]] = 0;

            // Sets the location in the 2D array to the ID of the piece 
            Board.board[tile.position[0]][tile.position[1]] = $(this).attr("id");

            // Thisa sets the position variable in the Piece object to the new position, that of the tile
            this.position = [tile.position[0], tile.position[1]];
            
            //This changes the css using board's dictionary
            this.element.css('top', Board.dictionary[this.position[0]]);
            this.element.css('left', Board.dictionary[this.position[1]]);
        }
    }

    // Creates a tile object for all black pieces on the board. (32 total)
    // All peices can only move on the black as they can only move diagonally 
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
            // Check if row and column is within bounds of the gameboard
            if (row < 0 || row > 7 || column < 0 || column > 7)
                return false;
            
            // If location in 2D array == 0, then no piece is there. Valid move
            // If the location is > 0, then that means there is a piece there. Not a valid move.
            if (this.board[row][column] == 0)
                return true;
            return false;
        },

        // Change player turn using if-else statement
        changePlayerTurn: function() {
            if (this.playerTurn == 1) {
                this.playerTurn = 2
                lastPlayerTurn = 1 
            } else {
                this.playerTurn = 1
            }
        },

        checkForJump: function() {

        }
    }

    Board.initialize();

    // Depending on players turn, will set the piece to selected if its their turn
    $('.piece').on("click", function () {

        if (playerTurn != lastPlayerTurn) {

            // If piece with ID "id" and boolean allowedToMove = true, then ...
            if (pieces[$(this).attr("id")].allowedToMove) {

                // If no piece is selected. Add selected and make the boolean variable true
                if (!isAnySelected) {
                    $(this).addClass('selected');
                    return isAnySelected = true;
                }

                // If boolean variable is true, something is selected. If the piece clicked
                // also has selected at end of it. Remove it. If neither if statements are true
                // Nothing will happen.
                if (isAnySelected && $(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    return isAnySelected = false;
                }
            }
        }
    });

    $('.tile').on("click", function () {

        // When tile is clicked, returns tile[#id], then replaces "tile" with "" to just give ID
        tileID = $(this).attr("id").replace("tile","");

        // This assigns the variable selectedTile to the specific Tile object that was clicked.
        selectedTile = tiles[tileID];

        // This sets local variable piece to Piece object of the selected piece (Grab the id attribute)
        var piece = pieces[$('.selected').attr("id")];

        piece.move(selectedTile)

    });
}