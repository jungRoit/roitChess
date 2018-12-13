function BlackBishop(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/bB.png';
    this.value = -3;
    this.validMovesList = [];
    this.canCaptureList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;
    this.team = 'b';



    var posTop = 8;
    var posBottom = -8;
    var posLeft = 1;
    var posRight = -1;




    this.setValidMoves = function (pieceList) {
        that.validMovesList = [];
        that.canCaptureList = [];

        //top right
            that.addToList(pieceList, posBottom, posLeft,Ranks.length - that.currentPos.rank);
        //top left 
        
            that.addToList(pieceList, posBottom, posRight,Ranks.length - that.currentPos.rank);
        // bottom right
            that.addToList(pieceList, posTop, posLeft,that.currentPos.rank);
        //bottom left
            that.addToList(pieceList, posTop, posRight,that.currentPos.rank);
    }

        this.addToList = function (pieceList, pos1, pos2, loopMax) {
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