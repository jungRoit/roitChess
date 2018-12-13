function BlackPawn(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/bp.png';
    this.value = -1;
    this.validMovesList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;
    this.team = 'b';



   

    this.setValidMoves = function (pieceList) {
        that.validMovesList = [];
        if(!that.moved){
            let tile1 = tiles.getTileById(that.currentPos.id + 16);

            if (!tile1.hasPiece) that.validMovesList.push(tile1);

        }

        if (that.currentPos.file != 'A') {
            var next = tiles.getTileById(that.currentPos.id + 8);
            if(next.hasPiece) {

            }else {
                that.validMovesList.push(next);
            }
            
        }

    }




}