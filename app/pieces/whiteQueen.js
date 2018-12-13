function WhiteQueen(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wQ.png';
    this.value = 9;
    this.validMovesList = [];
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
              that.addToListRook(pieceList,posTop, Ranks.length - that.currentPos.rank);
        
              // bottom valid moves
              that.addToListRook(pieceList,posBottom,that.currentPos.rank);
        
              // right valid moves
              that.addToListRook(pieceList,posRight,Files.length - Files.indexOf(that.currentPos.file));
        
             //left valid moves
             that.addToListRook(pieceList,posLeft,Files.indexOf(that.currentPos.file));

             //top right
        that.addToListBishop(pieceList, posTop, posRight,Ranks.length - that.currentPos.rank);
        //top left 
        
            that.addToListBishop(pieceList, posTop, posLeft,Ranks.length - that.currentPos.rank);
        // bottom right
            that.addToListBishop(pieceList, posBottom, posRight,that.currentPos.rank);
        //bottom left
            that.addToListBishop(pieceList, posBottom, posLeft,that.currentPos.rank);
        
            }
        
            this.addToListRook = function(pieceList,pos,loopMax) {
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
            this.addToListBishop = function (pieceList, pos1, pos2, loopMax) {
                for (let i = 1; i <= loopMax; i++) {
                    let validTile = tiles.getTileById(that.currentPos.id + (pos1 * i) + (pos2 * i));
        
                    if (validTile == null) {
                        break;
                    }
        
                    if (validTile.hasPiece) {
                        let tilePiece = pieceList.getByName(validTile.pieceName).getPiece();
                        if (tilePiece.team != that.team && that.currentPos.color == validTile.color) {
                            that.canCaptureList.push(validTile);
                        }
                        break;
                    } else {
        
                        if (that.currentPos.color == validTile.color) {
                            that.validMovesList.push(validTile);
                        }
                    }
                }
            }




}