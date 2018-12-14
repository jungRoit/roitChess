function Rook(name, file, rank,team) {
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

    if(that.team == 'w') {
        this.value = 5;
        this.img = 'img/wR.png';
    }else if(that.team == 'b'){
        this.value = -5;
        this.img = 'img/bR.png';
    }

    var posTop = -8;
    var posBottom = 8;
    var posLeft = -1;
    var posRight = 1;


    

    this.setValidMoves = function (pieceList) {

        that.validMovesList = [];
        that.canCaptureList = [];
        //top valid moves
      that.addToList(pieceList,posTop, Ranks.length - that.currentPos.rank);

      // bottom valid moves
      that.addToList(pieceList,posBottom,that.currentPos.rank);

      // right valid moves
      that.addToList(pieceList,posRight,Files.length - Files.indexOf(that.currentPos.file));

     //left valid moves
     that.addToList(pieceList,posLeft,Files.indexOf(that.currentPos.file));
    }

    this.addToList = function(pieceList,pos,loopMax) {
        for (let i = 1; i <= loopMax; i++) {
            
            let validTile = tiles.getTileById(that.currentPos.id + pos * i);
            if(validTile == null) {
                break;
            }
            if(validTile.hasPiece) {
                let tilePiece = pieceList.getByName(validTile.pieceName);
                if (tilePiece.team != that.team) {
                    that.canCaptureList.push(validTile);
                }
                break;
            }else {
                that.validMovesList.push(validTile);
            }
            
        }
    }



}