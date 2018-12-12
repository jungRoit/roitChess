function WhiteBishop(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wB.png';
    this.value = 3;
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



    this.setValidMoves = function () {
        that.validMovesList = [];

        //top right
        for (let i = 1; i <= Ranks.length - that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posTop * i) + (posRight * i));

            if (validTile == null) {
                break;
            }

            if(validTile.hasPiece) {
                break;
            }

            if (that.currentPos.color == validTile.color) {
                that.validMovesList.push(validTile);
            }

        }

        //top left 
        for (let i = 1; i <= Ranks.length - that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posTop * i) + (posLeft * i));
            if (validTile == null) {
                break;
            } else {

                if(validTile.hasPiece) {
                    break;
                }
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
                }
            }
        }

        // bottom right
        for (let i = 1; i <= that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posBottom * i) + (posRight * i));
            if (validTile == null) {
                break;
            } else {

                if(validTile.hasPiece) {
                    break;
                }
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
                }
            }
        }

        //bottom left
        for (let i = 1; i <= that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posBottom * i) + (posLeft * i));
            if (validTile == null) {
                break;
            } else {
                if(validTile.hasPiece) {
                    break;
                }
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
                }
            }
        }
    }

  

}