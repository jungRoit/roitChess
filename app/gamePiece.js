function GamePiece(piece) {
    var that = this;
    this.name = piece.name
    this.img = piece.img;
    this.value = piece.value;
    this.id = 0;
    this.enabled = piece.enabled;
    this.captured = piece.captured;
    this.moved = piece.moved;
    this.team = piece.team;
    this.type = piece.type;
    this.isChecked = false;
    this.checkMoveList = [];

    let castleTilesKing, castleTilesQueen;



    var pic = document.createElement('img');

    this.draw = function (id) {
        let tile = tiles.getTile(piece.file, piece.rank);
        tile.pieceName = piece.name;
        piece.currentPos = tile;
        pic.src = piece.img;
        pic.style.zIndex = '10';
        pic.id = id;

        tile.getElement().appendChild(pic);
        tile.hasPiece = true;
        that.id = id;


    }

    this.CheckValidMoves = function (pieceList, beforeTile) {
        that.detectCheck(pieceList);

        let player = playerList.getByTeam(that.team);



        piece.setValidMoves(pieceList);

        if (piece.validMovesList != null) {

            piece.validMovesList.forEach((tile) => {
                tile.enabled = false;
                tile.enableMove = true;
                tile.enableCapture = false;
                tile.checkEnabled();

                tile.getElement().addEventListener('click', function () {
                    if (tile.enableMove == true && that.enabled == true) {
                        that.createMove(pieceList, tile, beforeTile);
                        that.move(pieceList, moveList[moveList.length - 1], false,false);
                        that.detectCheck(pieceList);
                        if (player.isChecked == true) {
                            that.undoMove(pieceList, false);
                        }

                    }
                });
            });
        }

        if (piece.canCaptureList != null) {
            piece.canCaptureList.forEach(t => {
                t.enabled = false;
                t.enableMove = false;
                t.enableCapture = true;
                t.checkCaptureLight();

                t.getElement().addEventListener('click', function () {
                    if (t.enableCapture == true && that.enabled == true) {
                        that.createMove(pieceList, t, beforeTile);
                        that.move(pieceList, moveList[moveList.length - 1], true,false);
                        that.detectCheck(pieceList);
                        if (player.isChecked == true) {
                            that.undoMove(pieceList, true);
                        }

                    }

                });
            });
        }

        if (piece.type == 'king') {
            castleTilesKing = player.isCastleAvailable(pieceList, 'k');
            that.generateCastleLight(pieceList, castleTilesKing, 'k');

            castleTilesQueen = player.isCastleAvailable(pieceList, 'q');
            that.generateCastleLight(pieceList, castleTilesQueen, 'q');
        }
    }

    //function to move or capture piece
    this.move = function (pieceList, move, captureFlag,isUndo) {

        let tile = tiles.getTile(move.to.file, move.to.rank);
        let initTile = tiles.getTile(move.from.file, move.from.rank);
        let player = playerList.getByTeam(that.team);

        if (captureFlag && !isUndo) {
            let beforePiece = pieceList.getByName(initTile.pieceName);
            let delPiece = pieceList.getByName(tile.pieceName);
            tile.hasPiece = true;
            tile.pieceName = beforePiece.name;
            delPiece.captured = true;
            capturedPieceList.push(delPiece);
            tile.getElement().removeChild(delPiece.getElement());
        }
        if(captureFlag && isUndo) {
            let beforePiece = pieceList.getByName(initTile.pieceName);
            let delPiece = capturedPieceList[capturedPieceList.length-1];
            tile.hasPiece = true;
            tile.pieceName = beforePiece.name;
            delPiece.captured = false;
            initTile.getElement().appendChild(delPiece.getElement());
        }

        initTile.hasPiece = false;
        initTile.pieceName = '';
        tile.hasPiece = true;
        tile.pieceName = that.name;
        piece.file = tile.getFile();
        piece.rank = tile.getRank();
        piece.currentPos = tile;
        piece.moved = true;
        that.moved = piece.moved;

        tile.getElement().appendChild(that.getElement());


        game.switchTurn();

        that.resetTiles();
        pieceList.disableAll();

    }

    this.undoMove = function (pieceList, captureFlag) {
        setTimeout(() => {
            let to = moveList[moveList.length - 1].from;
            let from = moveList[moveList.length - 1].to;
            let piece = moveList[moveList.length - 1].piece;
            let revMove = new Move(to, from, piece);

            let tile = tiles.getTile(from.file, from.rank);
            if (captureFlag == true) {
                that.move(pieceList, revMove, true,true);
            } else {
                that.move(pieceList, revMove, false,true);
            }

            let move = moveList[moveList.length - 1];
            let index = moveList.indexOf(move);
            moveList.splice(index, 1);
            pieceList.disableAll();
            that.resetTiles();
        }, 1000);
    }

    this.getElement = function () {
        return pic;
    }

    this.getPiece = function () {
        return piece;
    }

    this.createCheckMoveList = function (pieceList) {
        let result = [];
        that.checkMoveList = [];

        pieceList.getAll().forEach(p => {
            if (p.team != that.team) {
                p.getPiece().setValidMoves(pieceList);
                p.getPiece().canCaptureList.forEach(move => {
                    result.push(move);
                });
            }
        });
        that.checkMoveList = result.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });


    }

    this.detectCheck = function (pieceList) {
        that.createCheckMoveList(pieceList);
        playerList.disableAllIsChecked();

        that.checkMoveList.forEach(tile => {
            let CheckPiece = pieceList.getById(tile.getPiece().id);
            if (CheckPiece.type == 'king') {
                playerList.getAll().forEach(player => {
                    if (player.team == that.team) {
                        player.isChecked = true;
                        console.log('check');

                    }
                });
            }
        });
    }

    this.resetTiles = function () {

        if (piece.validMovesList != null) {
            piece.validMovesList.forEach(t => {
                t.disableMove();
                t.setEnabled();
                t.checkEnabled();
            });
        }

        if (piece.canCaptureList != null) {
            piece.canCaptureList.forEach(p => {
                p.disableCapture();
                p.setEnabled();
                p.checkCaptureLight();
            });
        }

        if (castleTilesKing != null) {
            castleTilesKing.forEach(tile => {
                tile.setDisableCastle();
                tile.enabled = true;
                tile.enableMove = false;
                tile.enableCapture = false;
                tile.checkCastleLight();
            });
        }

        if (castleTilesQueen != null) {
            castleTilesQueen.forEach(tile => {
                tile.setDisableCastle();
                tile.enabled = true;
                tile.enableMove = false;
                tile.enableCapture = false;
                tile.checkCastleLight();
            });
        }
    }

    this.createMove = function (pieceList, tile, beforeTile) {
        let to = {
            file: tile.getFile(),
            rank: tile.getRank()
        }
        let from = {
            file: beforeTile.getFile(),
            rank: beforeTile.getRank()
        }
        let piece = pieceList.getByName(beforeTile.pieceName);

        let move = new Move(to, from, piece);
        moveList.push(move);

    }

    this.castle = function (pieceList, castleTiles, side) {
        let king = pieceList.getByName(castleTiles[castleTiles.length - 1].pieceName);
        let rook = pieceList.getByName(castleTiles[0].pieceName);



        castleTiles[1].getElement().appendChild(king.getElement());
        castleTiles[2].getElement().appendChild(rook.getElement());

        castleTiles[0].hasPiece = false;
        castleTiles[0].pieceName = '';

        castleTiles[1].hasPiece = true;
        castleTiles[1].pieceName = king.name;

        castleTiles[2].hasPiece = true;
        castleTiles[2].pieceName = rook.name;

        castleTiles[3].hasPiece = false;
        castleTiles[3].pieceName = '';
        if (side == 'q') {
            castleTiles[4].hasPiece = false;
            castleTiles[4].pieceName = '';
        }

        that.resetTiles();


        king.getPiece().moved = true;
        king.getPiece().file = castleTiles[1].file;
        king.getPiece().rank = castleTiles[1].rank;
        king.getPiece().currentPos = castleTiles[1];

        king.moved = true;
        king.file = castleTiles[1].file;
        king.rank = castleTiles[1].rank;
        king.currentPos = castleTiles[1];

        rook.getPiece().moved = true;
        rook.getPiece().file = castleTiles[2].file;
        rook.getPiece().rank = castleTiles[2].rank;
        rook.getPiece().currentPos = castleTiles[2];

        rook.moved = true;
        rook.file = castleTiles[2].file;
        rook.rank = castleTiles[2].rank;
        rook.currentPos = castleTiles[2];


        that.resetTiles();
        // console.log(castleTiles);
        console.log(king);
        console.log(rook);
        game.switchTurn();

    }

    this.generateCastleLight = function (pieceList, castleTiles, side) {

        if (castleTiles != null) {
            let tile;
            // if (side == 'k') {
            tile = castleTiles[1];
            // } else {
            //     tile = castleTiles[2];
            // }


            tile.setEnableCastle();
            tile.enabled = false;
            tile.enableMove = false;
            tile.enableCapture = false;
            tile.checkCastleLight();
            tile.getElement().addEventListener('click', function () {
                if (tile.enableCastle == true && that.enabled == true) {
                    that.castle(pieceList, castleTiles, side);
                }

            });
        }
    }



}