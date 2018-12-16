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
                        that.move(pieceList, moveList[moveList.length - 1]);
                        that.detectCheck(pieceList);
                        if(player.isChecked == true){
                            that.undoMove(pieceList);
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
                    if (t.enableCapture == true) {
                        that.capture(pieceList, t, beforeTile);
                    }

                });
            });
        }

        
        


    }

    this.move = function (pieceList, move) {

        let tile = tiles.getTile(move.to.file, move.to.rank);

        let initTile = tiles.getTile(move.from.file, move.from.rank);
        initTile.hasPiece = false;
        initTile.pieceName = '';
        // that.detectCheck(pieceList);
        let player = playerList.getByTeam(that.team);
        // if(player.isChecked != true){
        tile.getElement().appendChild(that.getElement());
        // that.detectCheck(pieceList);

        game.switchTurn();

        that.resetTiles();

        tile.hasPiece = true;
        tile.pieceName = piece.name;
        piece.file = tile.getFile();
        piece.rank = tile.getRank();
        piece.currentPos = tile;
        piece.moved = true;
        piece.enabled = false;
        pieceList.disableAll();
        console.log(tiles);


    }

    this.capture = function (pieceList, tile, beforeTile) {

        let beforePiece = pieceList.getByName(beforeTile.pieceName);
        tile.hasPiece = true;
        tile.pieceName = beforePiece.name;

        let currentPiece = tile.getPiece();
        let delPiece = pieceList.getById(currentPiece.id);
        delPiece.captured = true;
        tile.getElement().removeChild(currentPiece);

        that.resetTiles();



        piece.file = tile.getFile();
        piece.rank = tile.getRank();
        piece.currentPos = tile;
        piece.moved = true;
        piece.enabled = false;
        let tileIndex = piece.canCaptureList.indexOf(tile);
        piece.canCaptureList.splice(tileIndex, 1);
        setTimeout(function () {

            tile.getElement().appendChild(beforePiece.getElement());
            beforeTile.hasPiece = false;
            beforeTile.pieceName = '';

            game.switchTurn();
        }, 500);

        pieceList.disableAll();
        that.createMove(pieceList, tile, beforeTile);

    }

    this.undoMove = function (pieceList) {
        setTimeout(() => {
            let to = moveList[moveList.length - 1].from;
            let from = moveList[moveList.length - 1].to;
            let piece = moveList[moveList.length - 1].piece;
            let revMove = new Move(to, from, piece);
            // console.log(revMove);
            that.move(pieceList, revMove);
            let move = moveList[moveList.length - 1];
            let index = moveList.indexOf(move);
            moveList.splice(index, 1);
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
        })


    }

    this.detectCheck = function (pieceList) {
        that.createCheckMoveList(pieceList);
        playerList.disableAllIsChecked();
        that.checkMoveList.forEach(tile => {
            let CheckPiece = pieceList.getById(tile.getPiece().id);
            if (CheckPiece.value == 100 || CheckPiece.value == -100) {
                playerList.getAll().forEach(player => {
                    if (player.team == that.team) {
                        player.isChecked = true;
                    }
                });
                console.log('check');


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

        let piece = pieceList.getByName(tile.pieceName);

        let move = new Move(to, from, piece);
        moveList.push(move);
        // console.log(moveList);

    }



}