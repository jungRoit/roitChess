function WhitePawn(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wP.png';
    this.value = 1;
    this.validMovesList = [];
    this.canCaptureList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;
    this.team = 'w';

    var posTop = -8;
    var posLeft = -1;
    var posRight = 1;
    
    var firstMove = -16;
    this.endTile = 8;

  


    this.setValidMoves = function (pieceList) {
        that.validMovesList = [];
        that.canCaptureList = [];

        if(!that.moved){
            let tile1 = tiles.getTileById(that.currentPos.id + firstMove);

            if (!tile1.hasPiece) that.validMovesList.push(tile1);

        }

        if (that.currentPos.rank != that.endTile) {
            let next = tiles.getTileById(that.currentPos.id + posTop);
            
            let tileLeft = tiles.getTileById(that.currentPos.id +posTop + posLeft);
            let tileRight = tiles.getTileById(that.currentPos.id +posTop + posRight);
            
           that.checkCapture(pieceList,tileLeft,next);
           that.checkCapture(pieceList,tileRight,next);

           
        }

    }

    //next tile is the tile directly above the pawn where it can move if there is no pieces
    //tile is the tile where possible pieces for capture is checked
    this.checkCapture = function(pieceList,tile,next) {
        if(tile.hasPiece) {
            let tilePiece = pieceList.getByName(tile.pieceName).getPiece();
            if (tilePiece.team != that.team) {
                that.canCaptureList.push(tile);
            }
        }else {
            that.validMovesList.push(next);
        }
    }



}