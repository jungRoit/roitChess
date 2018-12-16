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
                        that.move(pieceList,moveList[moveList.length - 1],false);
                        that.detectCheck(pieceList);
                        if (player.isChecked == true) {

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

                        that.createMove(pieceList, t, beforeTile);
                        that.move(pieceList, moveList[moveList.length - 1],true);
                        that.detectCheck(pieceList);
                        if (player.isChecked == true) {

                            that.undoMove(pieceList);
                        }
                    }

                });
            });
        }
    }

    this.move = function (pieceList, move, captureFlag) {

        let tile = tiles.getTile(move.to.file, move.to.rank);
        let initTile = tiles.getTile(move.from.file, move.from.rank);
        let player = playerList.getByTeam(that.team);

        if (captureFlag) {
            let beforePiece = pieceList.getByName(initTile.pieceName);
                tile.hasPiece = true;
                tile.pieceName = beforePiece.name;

            let currentPiece = tile.getPiece();
            let delPiece = pieceList.getById(currentPiece.id);
            delPiece.captured = true;
            tile.getElement().removeChild(currentPiece);
        }
           
            initTile.hasPiece = false;
            initTile.pieceName = '';
            tile.hasPiece = true;
            tile.pieceName = that.name;
            piece.file = tile.getFile();
            piece.rank = tile.getRank();
            piece.currentPos = tile;
            piece.moved = true;

            tile.getElement().appendChild(that.getElement());
            game.switchTurn();

        that.resetTiles();
        pieceList.disableAll();


    }

    this.undoMove = function (pieceList) {
        setTimeout(() => {
            let to = moveList[moveList.length - 1].from;
            let from = moveList[moveList.length - 1].to;
            let piece = moveList[moveList.length - 1].piece;
            let revMove = new Move(to, from, piece);
   
            let tile = tiles.getTile(from.file,from.rank);
            // if(tile.hasPiece) {
            //     that.move(pieceList, revMove,true);
            // }else {
                that.move(pieceList, revMove,false);
            // }
            
            let move = moveList[moveList.length - 1];
            let index = moveList.indexOf(move);
            moveList.splice(index, 1);
            pieceList.disableAll();
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
        });
    }

    this.detectCheck = function (pieceList) {
        that.createCheckMoveList(pieceList);
        playerList.disableAllIsChecked();
        console.log(playerList);
        console.log(that.checkMoveList);
        that.checkMoveList.forEach(tile => {
                let CheckPiece = pieceList.getById(tile.getPiece().id);
                if (CheckPiece.value == 100) {
                    playerList.getAll().forEach(player => {
                        if (player.team == that.team) {
                            player.isChecked = true;
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



}