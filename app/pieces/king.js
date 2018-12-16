function King(name, file,rank,team) {
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
    this.isChecked = false;
    this.team = team;
    this.type = 'king';

    if(that.team == 'w') {
        this.value = 100;
        this.img = 'img/wK.png';
    }else if(that.team == 'b'){
        this.value = -100;
        this.img = 'img/bK.png';
    }

    var posTop = -8;
    var postBottom = 8;
    var posLeft = -1;
    var posRight = 1;

    //variables for board limits;
    var rightFile = 'H';
    var leftFile = 'A';
    var bottomRank = 1;
    var topRank = 8;



    this.setValidMoves = function (pieceList) {

        that.validMovesList = [];
        that.canCaptureList = [];
        that.checkLeftAndRight(pieceList,leftFile,posLeft);
        that.checkLeftAndRight(pieceList,rightFile,posRight);


        if (that.currentPos.rank != topRank) {
            let mT = tiles.getTileById(that.currentPos.id + posTop);
            if(mT.hasPiece) {
                let tilePiece = pieceList.getByName(mT.pieceName).getPiece();
                if (tilePiece.team != that.team) {
                    that.canCaptureList.push(mT);
                }
            }else{
                that.validMovesList.push(mT);
            }

            if (that.currentPos.file != leftFile) {
                let mTL = tiles.getTileById(that.currentPos.id + posTop + posLeft);
                if(mTL.hasPiece) {
                    let tilePiece = pieceList.getByName(mTL.pieceName).getPiece();
                    if (tilePiece.team != that.team) {
                        that.canCaptureList.push(mTL);
                    }
                }else{
                that.validMovesList.push(mTL);
                }
            }

            if (that.currentPos.file != rightFile) {
                let mTR = tiles.getTileById(that.currentPos.id + posTop + posRight);
                if(mTR.hasPiece) {
                    let tilePiece = pieceList.getByName(mTR.pieceName).getPiece();
                    if (tilePiece.team != that.team) {
                        that.canCaptureList.push(mTR);
                    }
                }else{
                that.validMovesList.push(mTR);
                }
            }
        }

        if (that.currentPos.rank != bottomRank) {
            let mB = tiles.getTileById(that.currentPos.id + postBottom);
            if(mB.hasPiece) {
                let tilePiece = pieceList.getByName(mB.pieceName).getPiece();
                if (tilePiece.team != that.team) {
                    that.canCaptureList.push(mB);
                }
            }else{
            that.validMovesList.push(mB);
            }

            if (that.currentPos.file != leftFile) {
                let mBL = tiles.getTileById(that.currentPos.id + postBottom + posLeft);
                if(mBL.hasPiece) {
                    let tilePiece = pieceList.getByName(mBL.pieceName).getPiece();
                    if (tilePiece.team != that.team) {
                        that.canCaptureList.push(mBL);
                    }
                }else{
                that.validMovesList.push(mBL);
                }
            }

            if (that.currentPos.file != rightFile) {
                let mBR = tiles.getTileById(that.currentPos.id + postBottom + posRight);
                if(mBR.hasPiece) {
                    let tilePiece = pieceList.getByName(mBR.pieceName).getPiece();
                    if (tilePiece.team != that.team) {
                        that.canCaptureList.push(mBR);
                    }
                }else{
                that.validMovesList.push(mBR);
                }
            }
        }

    }

    this.checkLeftAndRight = function(pieceList,file,pos) {
        if (that.currentPos.file != file) {
            let mL = tiles.getTileById(that.currentPos.id + pos);
            if(mL.hasPiece) {
                let tilePiece = pieceList.getByName(mL.pieceName).getPiece();
                if (tilePiece.team != that.team) {
                    that.canCaptureList.push(mL);
                }
            }else {
                that.validMovesList.push(mL);
            }
           
        }
    }



   


}