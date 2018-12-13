function WhiteRook(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wR.png';
    this.value = 5;
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
        for (let i = 1; i < loopMax; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + pos * i);
            if(validTile.hasPiece) {
                let tilePiece = pieceList.getByName(validTile.pieceName).getPiece();
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