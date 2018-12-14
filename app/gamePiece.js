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

    this.CheckValidMoves = function (pieceList,beforeTile) {
        // console.log('helllo');
        piece.setValidMoves(pieceList);
        // piece.enabled = true;
        if(piece.validMovesList != null){
           
            piece.validMovesList.forEach((tile) => {
                tile.enabled = false;
                tile.enableMove = true;
                tile.enableCapture = false;
                tile.checkEnabled();
                tile.getElement().addEventListener('click', function () {
                    if (tile.enableMove == true && that.enabled == true) {
                        that.move(pieceList,tile);
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
                    if (t.enableCapture == true ) {
                        that.capture(pieceList, t,beforeTile);
                    }

                });
            });
        }
       


    }

    this.move = function (pieceList,tile) {
        // console.log(tile);
        let initTile = tiles.getTile(piece.file, piece.rank);
        initTile.hasPiece = false;

        tile.getElement().appendChild(that.getElement());
        game.switchTurn();

        if(piece.validMovesList != null) {
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


        tile.hasPiece = true;
        tile.pieceName = piece.name;
        piece.file = tile.getFile();
        piece.rank = tile.getRank();
        piece.currentPos = tile;
        piece.moved = true;
        piece.enabled = false;
        pieceList.disableAll();
        console.log(pieceList);
        console.log(tiles);

    }

    this.capture = function (pieceList, tile,beforeTile) {
        // console.log(beforeTile);
        // console.log(tile);
        // console.log('*********');
        let beforePiece = pieceList.getByName(beforeTile.pieceName);
        tile.hasPiece = true;
        tile.pieceName = beforePiece.name;

        let currentPiece = tile.getPiece();
        let delPiece = pieceList.getById(currentPiece.id);
        delPiece.captured = true;
        tile.getElement().removeChild(currentPiece);
        // pieceList.remove(delPiece);
        

        if(piece.validMovesList != null) {
            piece.validMovesList.forEach(t => {
                t.disableMove();
                t.setEnabled();
                t.disableCapture();
                t.checkEnabled();
            });
        }
        
        if (piece.canCaptureList != null) {
            piece.canCaptureList.forEach(p => {
               
                p.disableMove();
                p.disableCapture();
                p.setEnabled();
                p.checkCaptureLight();
            });
        }


        
        piece.file = tile.getFile();
        piece.rank = tile.getRank();
        piece.currentPos = tile;
        piece.moved = true;
        piece.enabled = false;
        let tileIndex = piece.canCaptureList.indexOf(tile);
        piece.canCaptureList.splice(tileIndex,1);
        setTimeout(function() {
            tile.getElement().appendChild(beforePiece.getElement());
            beforeTile.hasPiece = false;
            beforeTile.pieceName = '';
            game.switchTurn();
        },500);

        pieceList.disableAll();
        console.log(pieceList);
        console.log(tiles);
        
      

        

    }

    this.getElement = function () {
        return pic;
    }

    this.getPiece = function () {
        return piece;
    }



}