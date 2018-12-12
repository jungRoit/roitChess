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



   

    this.setValidMoves = function () {
        that.validMovesList = [];


        if (that.currentPos.file != 'H') {
            var next = tiles.getTileById(that.currentPos.id + 8);
            that.validMovesList.push(next);
        }

    }




}