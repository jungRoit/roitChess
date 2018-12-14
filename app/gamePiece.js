function GamePiece(piece) {
    var that = this;
    this.name = piece.name
    this.img = piece.img;
    this.value = piece.value;
    this.id = 0;
    this.enabled = piece.enabled;
    this.captured = piece.captured;
    this.moved = piece.moved;




    var pic = document.createElement('img');

    this.draw = function () {
        let tile = tiles.getTile(piece.file, piece.rank);
        tile.pieceName = piece.name;
        piece.currentPos = tile;
        pic.src = piece.img;
        pic.style.zIndex = '10';
        pic.id = that.id;

        tile.getElement().appendChild(pic);
        tile.hasPiece = true;
        that.id += 1;

    }

    this.CheckValidMoves = function (pieceList) {
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
                        that.capture(pieceList, t);
                    }

                });
            });
        }
       


    }

    this.move = function (pieceList,tile) {
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
       
       

    }

    this.capture = function (pieceList, tile) {

        // console.log(tile.enabled,tile.enableMove,tile.enableCapture);
        // let initTile = tiles.getTile(piece.file, piece.rank);
        // initTile.hasPiece = false;
        // initTile.pieceName = '';
        console.log(tile.pieceName);
        let currentPiece = pieceList.getByName(tile.pieceName);
        // currentPiece.getPiece().captured = true;
        // game.score += currentPiece.value;
        
        tile.getElement().removeChild(currentPiece.getElement());
        pieceList.remove(currentPiece);

        let tileIndex = piece.canCaptureList.indexOf(tile);
        piece.canCaptureList.splice(tileIndex,1);
        console.log(piece.canCaptureList);


         tile.getElement().appendChild(that.getElement());
        game.switchTurn();


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
        tile.hasPiece = true;
        tile.pieceName = piece.name;
        piece.file = tile.getFile();
        piece.rank = tile.getRank();
        piece.currentPos = tile;
        piece.moved = true;
        piece.enabled = false;
        

    }

    this.getElement = function () {
        return pic;
    }

    this.getPiece = function () {
        return piece;
    }



}