function WhiteKing(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wK.png';
    this.value = 100;
    this.validMovesList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;

    var posTop = -8;
    var postBottom = 8;
    var posLeft = -1;
    var posRight = 1;



    this.setValidMoves = function () {

        that.validMovesList = [];
        if (that.currentPos.file != 'A') {
            let mL = tiles.getTileById(that.currentPos.id + posLeft);
            that.validMovesList.push(mL);
        }

        if (that.currentPos.file != 'H') {
            let mR = tiles.getTileById(that.currentPos.id + posRight);
            that.validMovesList.push(mR);
        }


        if (that.currentPos.rank != 8) {
            let mT = tiles.getTileById(that.currentPos.id + posTop);
            that.validMovesList.push(mT);

            if (that.currentPos.file != 'A') {
                let mTL = tiles.getTileById(that.currentPos.id + posTop + posLeft);
                that.validMovesList.push(mTL);
            }

            if (that.currentPos.file != 'H') {
                let mTR = tiles.getTileById(that.currentPos.id + posTop + posRight);
                that.validMovesList.push(mTR);
            }
        }

        if (that.currentPos.rank != 1) {
            let mB = tiles.getTileById(that.currentPos.id + postBottom);
            that.validMovesList.push(mB);
            if (that.currentPos.file != 'A') {
                let mBL = tiles.getTileById(that.currentPos.id + postBottom + posLeft);
                that.validMovesList.push(mBL);
            }

            if (that.currentPos.file != 'H') {
                let mBR = tiles.getTileById(that.currentPos.id + postBottom + posRight);
                that.validMovesList.push(mBR);
            }
        }

    }

   


}