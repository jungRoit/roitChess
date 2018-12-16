function Pawn(name, file, rank,team) {
    var that = this;
    this.name = name
    this.validMovesList = [];
    this.canCaptureList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;
    this.team = team;
    this.type = 'pawn';

    if(that.team == 'w') {
        this.value = 1;
        this.img = 'img/wP.png';
        var posTop = -8;
        var firstMove = -16;
        this.endTile = 8;
    }else if(that.team == 'b'){
        this.value = -1;
        this.img = 'img/bP.png';
        var posTop = 8;
        var firstMove = 16;
        this.endTile = 1;
    }


    
    var posLeft = -1;
    var posRight = 1;
    


  


    this.setValidMoves = function (pieceList) {
        // console.log(that);
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
            
            that.checkMove(next);
           that.checkCapture(pieceList,tileLeft);
           that.checkCapture(pieceList,tileRight);

           
        }

    }

    //next tile is the tile directly above the pawn where it can move if there is no pieces
    //tile is the tile where possible pieces for capture is checked
    this.checkCapture = function(pieceList,tile) {
        if(tile.hasPiece) {
            let tilePiece = pieceList.getByName(tile.pieceName).getPiece();
            if (tilePiece.team != that.team) {
                that.canCaptureList.push(tile);
            }
        }
    }
    this.checkMove = function(next) {
        if(!next.hasPiece) {
            that.validMovesList.push(next);
        }
        
    }



}