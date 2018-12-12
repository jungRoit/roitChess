function BlackKing(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/bK.png';
    this.value = -100;
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
    var postBottom = -8;
    var posLeft = -1;
    var posRight = 1;


   
    this.setValidMoves = function () {

        that.validMovesList = [];
        that.canCaptureList = [];

        if (that.currentPos.file != 'A') {
            let mL = tiles.getTileById(that.currentPos.id + posLeft);
            if(mL.hasPiece) {
                that.canCaptureList.push(mL);
            }else {
                that.validMovesList.push(mL);
            }
            
        }

        if (that.currentPos.file != 'H') {
            let mR = tiles.getTileById(that.currentPos.id + posRight);
            if(mR.hasPiece) {
                that.canCaptureList.push(mR);
            }else {
            that.validMovesList.push(mR);
            }
        }


        //top moves
        if (that.currentPos.rank != 1) {
            let mT = tiles.getTileById(that.currentPos.id + posTop);
            if(mT.hasPiece) {
                that.canCaptureList.push(mT);
            }else {
            that.validMovesList.push(mT);
            }

            if (that.currentPos.file != 'A') {
                let mTL = tiles.getTileById(that.currentPos.id + posTop + posLeft);
                if(mTL.hasPiece) {
                    that.canCaptureList.push(mTL);
                }else {
                that.validMovesList.push(mTL);
                }
            }

            if (that.currentPos.file != 'H') {
                let mTR = tiles.getTileById(that.currentPos.id + posTop + posRight);
                if(mTR.hasPiece) {
                    that.canCaptureList.push(mTR);
                }else {
                that.validMovesList.push(mTR);
                }
            }
        }

        //bottom moves
        if (that.currentPos.rank != 8) {
            let mB = tiles.getTileById(that.currentPos.id + postBottom);
            if(mB.hasPiece) {
                that.canCaptureList.push(mB);
            }else {
            that.validMovesList.push(mB);
            }


            if (that.currentPos.file != 'A') {
                let mBL = tiles.getTileById(that.currentPos.id + postBottom + posLeft);
                if(mBL.hasPiece) {
                    that.canCaptureList.push(mBL);
                }else {
                that.validMovesList.push(mBL);
                }
            }

            if (that.currentPos.file != 'H') {
                let mBR = tiles.getTileById(that.currentPos.id + postBottom + posRight);
                if(mBR.hasPiece) {
                    that.canCaptureList.push(mBR);
                }else {
                that.validMovesList.push(mBR);
                }
            }
        }
    }



}